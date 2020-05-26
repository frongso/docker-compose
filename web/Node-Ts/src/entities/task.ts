import { Comment } from './comment';
import { Entity, BaseEntity, Column, JoinColumn, ManyToOne, OneToOne, OneToMany } from 'typeorm';
import { Project } from './project';
import { UserMapTask } from './user-map-task';

@Entity('Task', { schema: 'task-management' })
export class Task extends BaseEntity {
  @Column('bigint', {
    primary: true,
    nullable: false,
    name: 'id',
    generated: true,
  })
  id: number;

  @Column('varchar', {
    name: 'taskname',
    length: 45,
    nullable: false,
  })
  taskname: string;

  @Column('varchar', {
    name: 'taskdesc',
    length: 45,
  })
  taskdesc: string;

  @Column('date', {
    name: 'create_at',
    nullable: false,
  })
  // tslint:disable-next-line:variable-name
  create_at: Date;

  @Column('date', {
    name: 'edited_at',
    nullable: false,
  })
  // tslint:disable-next-line:variable-name
  edited_at: Date;

  @Column('varchar', {
    name: 'taskstatus',
    length: 45,
  })
  taskstatus: string;

  // (FK) Project_id
  @JoinColumn({ name: 'PROJECT_ID' })
  @ManyToOne((type) => Project, (project) => project.task, { eager: true, cascade: false })
  Projectid: Project;

  // ส่งออกไปให้ User_Task
  @OneToOne((type) => UserMapTask, (usermaptask) => usermaptask.Taskid)
  usermaptask: UserMapTask;

  // ส่งออกไปให้ Comment
  @OneToMany((type) => Comment, (comment) => comment.Taskid)
  comment: Comment;
}
