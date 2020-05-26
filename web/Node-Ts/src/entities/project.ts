import { BaseEntity, Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { RoleMapUser } from './role-map-user';
import { Task } from './task';
import { UserMapProject } from './user-map-project';

@Entity('Project', { schema: 'task-management' })
export class Project extends BaseEntity {
  @Column('bigint', {
    primary: true,
    nullable: false,
    name: 'id',
    generated: true,
  })
  id: number;

  @Column('varchar', { name: 'projectname', unique: true, nullable: false, length: 45 })
  projectname: string;

  @Column('varchar', { name: 'projectdesc', length: 45 })
  projectdesc: string;

  @Column('date', { name: 'create_at', nullable: false })
  // tslint:disable-next-line:variable-name
  create_at: Date;

  @Column('date', { name: 'edited_at', nullable: false })
  // tslint:disable-next-line:variable-name
  edited_at: string;

  // ส่งออกไปให้ User_Role
  @OneToOne((type) => RoleMapUser, (roleMapUser) => roleMapUser.Projectid)
  rolemapusers: RoleMapUser[];

  // ส่งออกไปให้ Task
  @OneToMany((type) => Task, (roleMapUser) => roleMapUser.Projectid)
  task: Task;

  // ส่งออกไปให้ User_Project
  @OneToMany((type) => UserMapProject, (usermapproject) => usermapproject.Projectid)
  usermapproject: UserMapProject;
}
