import { Response } from 'express';
export declare class SecurityController {
    login(response: Response, credential: {
        username: string;
        password: string;
    }): Promise<Response<any>>;
}
