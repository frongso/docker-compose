import { User } from '../entities/user';
import { BaseEntity } from 'typeorm';
import { Role } from '../entities/role';
export declare class SaveRoleModel extends BaseEntity {
    role: Role;
    user: User;
}
