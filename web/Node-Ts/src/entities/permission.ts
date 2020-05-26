import { Entity, BaseEntity, Column, OneToMany } from 'typeorm';
import { RoleMapPermission } from './role-map-permission';

@Entity('Permission', { schema: 'task-management' })
export class Permission extends BaseEntity {
  @Column('bigint', {
    primary: true,
    nullable: false,
    generated: true,
    name: 'id',
  })
  id: number;

  @Column('varchar', {
    name: 'permissionname',
    nullable: false,
    length: 45,
  })
  permissionname: string;

  // ส่งออกไปให้ Role_Permission
  @OneToMany((type) => RoleMapPermission, (roleMapPermission) => roleMapPermission.Permissionid, { cascade: false, persistence: false })
  rolemappermission: RoleMapPermission;
}
