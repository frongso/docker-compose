import { BaseEntity } from 'typeorm';
import { RoleMapUser } from './rsm_role_map_use';
export declare class User extends BaseEntity {
    id: number;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    email: string;
    rolemapuser: RoleMapUser;
    hashPassword(): void;
    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string): boolean;
}
