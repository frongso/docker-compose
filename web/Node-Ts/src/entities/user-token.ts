import { BaseEntity, Entity, Column } from 'typeorm';

@Entity('User_Token', { schema: 'task-management' })
export class UserToken extends BaseEntity {
  @Column('bigint', {
    name: 'id',
    primary: true,
    generated: true,
    width: 22,
  })
  id: number;

  @Column('bigint', { name: 'USER_ID', width: 22, nullable: false })
  userId: number;

  @Column('varchar', {
    name: 'REFRESH_TOKEN',
    nullable: false,
  })
  refreshToken: string;

  constructor(userId: number, refreshToken: string) {
    super();
    this.userId = userId;
    this.refreshToken = refreshToken;
  }
}
