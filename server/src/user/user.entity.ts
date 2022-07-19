import { CommunityCommentEntity } from 'src/common/entities/community-comment.entity';
import { CommunityLikeEntity } from 'src/common/entities/community-like.entity';
import { UserProfileEntity } from 'src/common/entities/user-profile.entity';
import { CommunityEntity } from 'src/community/community.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
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

  @Column('varchar', { name: 'password', select: false })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToOne(
    () => UserProfileEntity,
    (profile: UserProfileEntity) => profile.user,
    {
      cascade: true,
    },
  )
  @JoinColumn({ name: 'profile_id', referencedColumnName: 'id' })
  profile: UserProfileEntity;

  @OneToMany(() => CommunityEntity, (post: CommunityEntity) => post.author, {
    cascade: true,
  })
  posts: CommunityEntity[];

  @OneToMany(
    () => CommunityLikeEntity,
    (like: CommunityLikeEntity) => like.user,
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
