import { User } from '../../entities/user';
import { Response } from 'express';
export declare class UserController {
    getAll(): Promise<User[]>;
    register(user: User): Promise<User>;
    delete(id: number, response: Response): Response<any>;
}
