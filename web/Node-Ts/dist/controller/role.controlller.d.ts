import { Role } from './../entities/role';
import { Response } from 'express';
export declare class RoleController {
    getall(): Promise<Role[]>;
    generate(role: Role): Promise<Role>;
    delete(id: number, response: Response): Response<any>;
}
