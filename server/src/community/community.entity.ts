import { CommunityCommentEntity } from 'src/common/entities/community-comment.entity';
import { CommunityLikeEntity } from 'src/common/entities/community-like.entity';
import { UserEntity } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Community')
export class CommunityEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'title' })
  title: string;

  @Column('text', { name: 'content' })
  content: string;

  @ManyToOne(() => UserEntity, (author: UserEntity) => author.posts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([
    {
      name: 'author_id',
      referencedColumnName: 'id',
    },
  ])
  author: UserEntity;

  @OneToMany(
    () => CommunityLikeEntity,
    (like: CommunityLikeEntity) => like.post,
    {
      cascade: true,
    },
  )
  likes: CommunityLikeEntity[];

  @OneToMany(
    () => CommunityCommentEntity,
    (comment: CommunityCommentEntity) => comment.post,
    { cascade: true },
  )
  comments: CommunityCommentEntity[];
}
