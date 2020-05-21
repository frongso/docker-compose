import { Role } from './role';
import { User } from './user';
import { Entity, BaseEntity, Column, OneToOne, JoinColumn, OneToMany, ManyToMany, ManyToOne } from 'typeorm';

@Entity('rsm_role_map_user', { schema: 'shopping_mall' })
export class RoleMapUser extends BaseEntity {
  @Column('bigint', {
    primary: true,
    name: 'RSM_RMU_ID',
    generated: true,
    width: 22,
  })
  rumid: number;

  @ManyToOne((type) => User, (user) => user.rolemapuser)
  @JoinColumn({ name: 'MSM_USER_ID' })
  user: User;

  @ManyToOne((type) => Role, (role) => role.rolemapuser)
  @JoinColumn({ name: 'MSM_ROLE_ID' })
  role: Role;
}
