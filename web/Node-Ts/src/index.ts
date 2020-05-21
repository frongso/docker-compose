import { LogMiddleware } from './routes/middleware/log.middleware';
import { UserController } from './routes/controller/user.controller';
import bodyParser from 'body-parser';
import { createExpressServer } from 'routing-controllers';
import { TestController } from './routes/controller/test.controller';
import { createConnection } from 'typeorm';
import { RoleController } from './routes/controller/role.controlller';
import { port } from './config/server';
import { SecurityController } from './routes/security/security.controller';
import { CheckJwtMiddleware } from './routes/middleware/checkJwt.middleware';
import { ListController } from './routes/controller/list.controlller';
createConnection()
  .then((connection) => {
    const app = createExpressServer({
      controllers: [TestController, UserController, RoleController, SecurityController, ListController],
      // middlewares: [LogMiddleware, CheckJwtMiddleware],
      routePrefix: '/service',
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
