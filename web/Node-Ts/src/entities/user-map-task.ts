import { Task } from './task';
import { Entity, BaseEntity, Column, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { User } from './user';

@Entity('User_Task', { schema: 'task-management' })
export class UserMapTask extends BaseEntity {
  @Column('bigint', {
    primary: true,
    nullable: false,
    generated: true,
    name: 'id',
  })
  id: number;

  // (FK) Task_id
  @JoinColumn({ name: 'TASK_ID' })
  @OneToOne((type) => Task, (task) => task.usermaptask, { eager: true, cascade: false })
  Taskid: Task;

  // (FK) User_id
  @JoinColumn({ name: 'USER_ID' })
  @ManyToOne((type) => User, (user) => user.usermaptask, { eager: true, cascade: false })
  Userid: User;
}
