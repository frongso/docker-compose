import { Response } from 'express';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import { tokenHeader } from '../../config/server';
import logger from '../../utils/logger';
import { verifyToken } from '../security/jwt.service';
import * as jwt from 'jsonwebtoken';
import { UserProfile } from '../security/user-profile';

@Middleware({ type: 'before' })
export class JwtMiddlewareBefore implements ExpressMiddlewareInterface {
  use(request: any, response: Response, next: (err?: any) => any) {
    // tslint:disable-next-line:no-console
    console.log(request.url);

    if ((request.url === '/service/login' || request.url === '/service/refresh' || request.url === '/service/user/register' || request.url === '/service/test') && request.method === 'POST') {
      return next();
    }

    const { headers } = request;
    if (headers[tokenHeader]) {
      const token = headers[tokenHeader];

      verifyToken(token)
        .then(() => next())
        .catch((err) => {
          logger.error(`${err}: ${token}`);
          return response.status(401).send(err);
        });
    } else {
      logger.error('Request does not have token');
      return response.sendStatus(401);
    }
  }
}
