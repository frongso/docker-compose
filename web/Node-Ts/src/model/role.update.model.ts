import { User } from '../entities/user';
import { BaseEntity } from 'typeorm';
import { Role } from '../entities/role';
export class UpdateRoleModel extends BaseEntity {
  roleId: number;
  roleName: string;
  users: number[];
}
