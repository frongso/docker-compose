import { BaseEntity } from 'typeorm';
import { RoleMapUser } from './rsm_role_map_use';
export declare class Role extends BaseEntity {
    id: number;
    name: string;
    rolemapuser: RoleMapUser;
}
