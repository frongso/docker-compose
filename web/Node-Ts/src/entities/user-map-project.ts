import { Entity, BaseEntity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { Project } from './project';
import { User } from './user';

@Entity('User_Project', { schema: 'task-management' })
export class UserMapProject extends BaseEntity {
  @Column('bigint', {
    primary: true,
    nullable: false,
    generated: true,
    name: 'id',
  })
  id: number;

  // (FK) Project_id
  @JoinColumn({ name: 'PROJECT_ID' })
  @ManyToOne((type) => Project, (project) => project.usermapproject, { eager: true, cascade: false })
  Projectid: Project;

  // (FK) User_id
  @JoinColumn({ name: 'USER_ID' })
  @ManyToOne((type) => User, (user) => user.usermapproject, { eager: true, cascade: false })
  Userid: User;
}
