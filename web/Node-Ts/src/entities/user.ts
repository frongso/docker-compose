import { BaseEntity, Column, Entity, OneToMany } from 'typeorm';
import { RoleMapUser } from './role-map-user';
import { UserMapProject } from './user-map-project';
import { UserMapTask } from './user-map-task';
import { Comment } from './comment';

@Entity('User', { schema: 'task-management' })
export class User extends BaseEntity {
  @Column('bigint', {
    primary: true,
    nullable: false,
    name: 'id',
    generated: true,
  })
  id: number;

  @Column('varchar', { name: 'username', unique: true, nullable: false, length: 32 })
  username: string;

  @Column('varchar', { name: 'userpassword', nullable: false })
  password: string;

  @Column('varchar', { name: 'firstname', nullable: false, length: 45 })
  firstname: string;

  @Column('varchar', { name: 'lastname', nullable: false, length: 45 })
  lastname: string;

  @Column('varchar', { name: 'email', length: 255 })
  email: string;

  // ส่งออกไปให้ User_role
  @OneToMany((type) => RoleMapUser, (roleMapUser) => roleMapUser.Roleid)
  rolemapusers: RoleMapUser[];

  // ส่งออกไปให้ User_Project
  @OneToMany((type) => UserMapProject, (usermapproject) => usermapproject.Userid)
  usermapproject: UserMapProject;

  // ส่งออกไปให้ User_Task
  @OneToMany((type) => UserMapTask, (usermaptask) => usermaptask.Userid)
  usermaptask: UserMapTask;

  // ส่งออกไปให้ Comment
  @OneToMany((type) => Comment, (comment) => comment.Userid)
  comment: Comment;
}
