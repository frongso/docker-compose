import { Entity, BaseEntity, Column, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Role } from './role';
import { User } from './user';
import { Project } from './project';

@Entity('User_Role', { schema: 'task-management' })
export class RoleMapUser extends BaseEntity {
  @Column('bigint', {
    primary: true,
    name: 'id',
    generated: true,
  })
  id: number;

  // (FK) Role_id
  @JoinColumn({ name: 'ROLE_ID' })
  @ManyToOne((type) => Role, (role) => role.rolemapusers, { eager: true, cascade: false })
  Roleid: Role;

  // (FK) User_id
  @JoinColumn({ name: 'USER_ID' })
  @ManyToOne((type) => User, (user) => user.rolemapusers, { eager: true, cascade: false })
  Userid: User;

  // (FK) Project_id
  @JoinColumn({ name: 'PROJECT_ID' })
  @OneToOne((type) => Project, (project) => project.rolemapusers, { eager: true, cascade: false })
  Projectid: Project;
}
