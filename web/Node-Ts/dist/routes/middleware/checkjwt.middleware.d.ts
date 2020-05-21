import { ExpressMiddlewareInterface } from 'routing-controllers';
import { Request } from 'express';
export declare class CheckJwtMiddleware implements ExpressMiddlewareInterface {
    use(request: Request, response: any, next: (err?: any) => any): any;
}
