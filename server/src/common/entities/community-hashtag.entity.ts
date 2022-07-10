import { CommunityEntity } from 'src/community/community.entity';
import { HashtagEntity } from 'src/hashtag/hashtag.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('CommunityHashtag')
export class CommunityHashtagEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ManyToOne(() => CommunityEntity, (post) => post.tags, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'post_id', referencedColumnName: 'id' })
  post: CommunityEntity;

  @ManyToOne(() => HashtagEntity, (hashtag) => hashtag.tags, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tag_id', referencedColumnName: 'id' })
  hashtag: HashtagEntity;
}
