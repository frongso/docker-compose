import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import * as jwt from 'jsonwebtoken';
import * as config from '../../config/server';
import { Request } from 'express';

@Middleware({ type: 'before' })
export class CheckJwtMiddleware implements ExpressMiddlewareInterface {
  use(request: Request, response: any, next: (err?: any) => any) {
    if (request.url === '/service/login' && request.method === 'POST') {
      return next();
    }
    // Get the jwt token from the head does it work ?
    let token = request.get(config.tokenHeader);

    if (!token.startsWith('Bearer')) {
      // Reject if there is no Bearer in the token
      return response.status(401).send('Token is invalid');
    }

    // Remove Bearer from string
    token = token.slice(7, token.length);

    // Try to validate the token and get data
    try {
      const payload = jwt.verify(token, config.secretKey);
      response.locals.jwtPayload = payload;
    } catch (error) {
      // If token is not valid, respond with 401 (unauthorized)
      response.sendStatus(401);
      return;
    }

    // The token is valid for 1 hour
    // We want to send a new token on every request
    const newToken = jwt.sign({ userId: response.locals.jwtPayload.id, username: response.locals.jwtPayload.username }, config.secretKey, { expiresIn: config.tokenLife });

    // Set header to send new token
    response.setHeader('token', newToken);

    // go next to controller
    return next();
  }
}
