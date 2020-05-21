import { BaseEntity } from 'typeorm';
export class UpdateRoleModel extends BaseEntity {
  testCase: number;

  roleName: string;
  users: number[];
}
