import { UserEntity } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SanchaekCommentEntity } from './sanchaek-comment.entity';

@Entity('SanchaekCommentLike')
export class SanchaekCommentLikeEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'userId' })
  userId: number;

  @Column('int', { name: 'commentId' })
  commentId: number;

  @ManyToOne(() => SanchaekCommentEntity, (comment) => comment.likes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'commentId', referencedColumnName: 'id' })
  comment: SanchaekCommentEntity;

  @ManyToOne(() => UserEntity, (user) => user.likes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: UserEntity;
}
