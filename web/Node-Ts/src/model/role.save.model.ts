import { User } from '../entities/user';
import { BaseEntity } from 'typeorm';
import { Role } from '../entities/role';
export class SaveRoleModel extends BaseEntity {
  role: Role;
  user: User;
}
