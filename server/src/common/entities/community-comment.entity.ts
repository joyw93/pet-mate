import { CommunityEntity } from 'src/community/community.entity';
import { UserEntity } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('CommunityComment')
export class CommunityCommentEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('text', { name: 'content' })
  content: string;

  @Column('int', { name: 'parentId', nullable: true })
  parentId: number;

  @Column('int', { name: 'depth', default: 0 })
  depth: number;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @ManyToOne(() => UserEntity, (author) => author.communityComments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'authorId', referencedColumnName: 'id' })
  author: UserEntity;

  @ManyToOne(() => CommunityEntity, (post) => post.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'postId', referencedColumnName: 'id' })
  post: CommunityEntity;
}
