import { CommunityEntity } from 'src/community/community.entity';
import { UserEntity } from 'src/user/user.entity';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('CommunityLike')
export class CommunityLikeEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ManyToOne(() => CommunityEntity, (post) => post.likes)
  @JoinColumn({ name: 'post_id', referencedColumnName: 'id' })
  post: CommunityEntity;

  @ManyToOne(() => UserEntity, (author) => author.likes)
  @JoinColumn({ name: 'author_id', referencedColumnName: 'id' })
  author: UserEntity;
}
