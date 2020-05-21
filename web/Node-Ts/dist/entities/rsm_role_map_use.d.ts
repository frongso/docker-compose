import { Role } from './role';
import { User } from './user';
import { BaseEntity } from 'typeorm';
export declare class RoleMapUser extends BaseEntity {
    rumid: number;
    user: User;
    role: Role;
}
