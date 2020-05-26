import { Entity, BaseEntity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { Task } from './task';
import { User } from './user';

@Entity('Comment', { schema: 'task-management' })
export class Comment extends BaseEntity {
  @Column('bigint', {
    primary: true,
    nullable: false,
    generated: true,
    name: 'id',
  })
  id: number;

  @Column('varchar', {
    nullable: false,
    name: 'text',
    length: 300,
  })
  commenttext: string;

  @Column('date', {
    name: 'create_at',
    nullable: true,
  })
  // tslint:disable-next-line:variable-name
  create_at: Date;

  @Column('date', {
    name: 'edited_at',
    nullable: true,
  })
  // tslint:disable-next-line:variable-name
  edited_at: Date;

  // (FK) Task_id
  @JoinColumn({ name: 'TASK_ID' })
  @ManyToOne((type) => Task, (task) => task.comment, { eager: true, cascade: false })
  Taskid: Task;

  // (FK) User_id (Comment_by)
  @JoinColumn({ name: 'COMMENT_BY' })
  @ManyToOne((type) => User, (user) => user.comment, { eager: true, cascade: false })
  Userid: User;
}
