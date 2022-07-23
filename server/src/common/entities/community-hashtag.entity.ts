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

  @Column('int', { name: 'postId' })
  postId: number;

  @Column('int', { name: 'tagId' })
  tagId: number;

  @ManyToOne(() => CommunityEntity, (post) => post.tags, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'postId', referencedColumnName: 'id' })
  post: CommunityEntity;

  @ManyToOne(() => HashtagEntity, (hashtag) => hashtag.tags, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tagId', referencedColumnName: 'id' })
  hashtag: HashtagEntity;
}
