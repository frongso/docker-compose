import { BaseEntity, Entity, Column, OneToMany, OneToOne } from 'typeorm';
import { RoleMapUser } from './role-map-user';
import { RoleMapPermission } from './role-map-permission';

@Entity('Role', { schema: 'task-management' })
export class Role extends BaseEntity {
  @Column('bigint', {
    primary: true,
    name: 'id',
    generated: true,
  })
  id: number;

  @Column('varchar', { name: 'rolename', nullable: false, length: 50 })
  rolename: string;

  // ส่งออกไปให้ User_Role
  @OneToMany((type) => RoleMapUser, (roleMapUser) => roleMapUser.Roleid, { cascade: false, persistence: false })
  rolemapusers: RoleMapUser[];

  // ส่งออกไปให้ Role_Permission
  @OneToOne((type) => RoleMapPermission, (roleMapPermission) => roleMapPermission.Roleid, { cascade: false, persistence: false })
  rolemappermission: RoleMapPermission;
}
