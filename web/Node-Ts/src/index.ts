import { RoleController } from './routes/controller/role.controller';
import { UserController } from './routes/controller/user.controller';
import { LogMiddleware } from './routes/middleware/log.middleware';
import bodyParser from 'body-parser';
import { createExpressServer, Action } from 'routing-controllers';
import { TestController } from './routes/controller/test.controller';
import { SecurityContrller, getUserProfile } from './routes/security/security.controller';
import { createConnection } from 'typeorm';
import { port, tokenHeader } from './config/server';
import * as jwt from 'jsonwebtoken';
import { JwtMiddlewareBefore } from './routes/middleware/jwt.middleware';
import { UserProfile } from './routes/security/user-profile';
import logger from './utils/logger';
import { User } from './entities/user';
createConnection()
  .then((connection) => {
    const app = createExpressServer({
      controllers: [TestController, UserController, SecurityContrller, RoleController],
      middlewares: [LogMiddleware, JwtMiddlewareBefore],
      routePrefix: '/service',
      authorizationChecker: async (action: Action, roles: string[]) => {
        if (!roles || !roles.length) {
          return true;
        }

        let token = action.request.headers[tokenHeader];

        // Remove Bearer from string
        token = token.slice(7, token.length);
        const user = jwt.decode(token) as UserProfile;

        // get new UserProfile for check permission
        const userProfile = await getUserProfile(user.username);

        if (userProfile && roles.find((role) => userProfile.roles.indexOf(role) !== -1)) {
          return true;
        }

        logger.info(`${user.username} has been forbidden for path ${action.request.url}`);
        action.response.status(403).send('Forbidden');
        return false;
      },
      currentUserChecker: async (action: Action) => {
        const token = action.request.headers[tokenHeader];
        const userProfile = jwt.decode(token) as UserProfile;
        return await User.findOne({
          where: { username: userProfile.username },
        })
          .then((user) => {
            if (user) {
              return user;
            } else {
              return action.response.sendStatusCode(500);
            }
          })
          .catch((err) => {
            logger.error(err);
            return action.response.sendStatusCode(500);
          });
      },
    });

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.listen(port, () => {
      // tslint:disable-next-line:no-console
      console.log('Hello world listen in port : ' + port);
    });
  })
  .catch((err) => {
    // tslint:disable-next-line:no-console
    console.log(err);
  });
