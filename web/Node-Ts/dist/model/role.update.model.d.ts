import { BaseEntity } from 'typeorm';
export declare class UpdateRoleModel extends BaseEntity {
    roleId: number;
    roleName: string;
    users: number[];
}
