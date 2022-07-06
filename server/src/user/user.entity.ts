import { CommunityCommentEntity } from 'src/common/entities/community-comment.entity';
import { CommunityLikeEntity } from 'src/common/entities/community-like.entity';
import { CommunityEntity } from 'src/community/community.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name' })
  name: string;

  @Column('varchar', { name: 'nickname' })
  nickname: string;

  @Column('varchar', { name: 'email' })
  email: string;

  @Column('varchar', { name: 'password' })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToMany(() => CommunityEntity, (post: CommunityEntity) => post.author, {
    cascade: true,
  })
  posts: CommunityEntity[];

  @OneToMany(
    () => CommunityLikeEntity,
    (like: CommunityLikeEntity) => like.author,
    {
      cascade: true,
    },
  )
  likes: CommunityLikeEntity[];

  @OneToMany(
    () => CommunityCommentEntity,
    (comment: CommunityCommentEntity) => comment.author,
    {
      cascade: true,
    },
  )
  comments: CommunityCommentEntity[];
}
