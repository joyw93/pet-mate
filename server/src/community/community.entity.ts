import { CommunityCommentEntity } from 'src/common/entities/community-comment.entity';
import { CommunityHashtagEntity } from 'src/common/entities/community-hashtag.entity';
import { CommunityImageEntity } from 'src/common/entities/community-image.entity';
import { CommunityLikeEntity } from 'src/common/entities/community-like.entity';
import { UserEntity } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Community')
export class CommunityEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'title' })
  title: string;

  @Column('text', { name: 'content' })
  content: string;

  @Column('int', { name: 'authorId' })
  authorId: number;

  @Column('int', { name: 'views', default: 0 })
  views: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @ManyToOne(() => UserEntity, (author: UserEntity) => author.posts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([
    {
      name: 'authorId',
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

  @OneToMany(
    () => CommunityHashtagEntity,
    (tag: CommunityHashtagEntity) => tag.post,
    { cascade: true },
  )
  tags: CommunityHashtagEntity[];

  @OneToMany(
    () => CommunityImageEntity,
    (image: CommunityImageEntity) => image.post,
    { cascade: true },
  )
  images: CommunityImageEntity[];
}
