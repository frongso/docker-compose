import { Entity, BaseEntity, Column, JoinTable, OneToMany } from 'typeorm';
import { RoleMapUser } from './rsm_role_map_use';

@Entity({
  name: 'msm_role',
  schema: 'shopping_mall',
})
export class Role extends BaseEntity {
  @Column('bigint', {
    name: 'MSM_ROLE_ID',
    primary: true,
    nullable: false,
    generated: true,
    width: 22,
  })
  id: number;
  @Column('varchar', {
    name: 'MSM_ROLE_NAME',
    nullable: false,
  })
  name: string;

  @OneToMany((type) => RoleMapUser, (rolemapuser) => rolemapuser.role)
  @JoinTable()
  rolemapuser: RoleMapUser;
}
