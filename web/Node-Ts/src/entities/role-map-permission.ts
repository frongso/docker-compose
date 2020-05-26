import { Permission } from './permission';
import { Entity, BaseEntity, Column, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Role } from './role';

@Entity('Role_Permission', { schema: 'task-management' })
export class RoleMapPermission extends BaseEntity {
  @Column('bigint', {
    primary: true,
    nullable: false,
    generated: true,
    name: 'id',
  })
  id: number;

  // (FK) Role_id
  @JoinColumn({ name: 'ROLE_ID' })
  @OneToOne((type) => Role, (role) => role.rolemappermission, { eager: true, cascade: false })
  Roleid: Role;

  // (FK) Permission_id
  @JoinColumn({ name: 'PERMISSION_ID' })
  @ManyToOne((type) => Permission, (permission) => permission.rolemappermission, { eager: true, cascade: false })
  Permissionid: Permission;
}
