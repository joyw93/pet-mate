import { CommunityEntity } from 'src/community/community.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('CommunityImage')
export class CommunityImageEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'url' })
  url: string;

  @Column('int', { name: 'postId' })
  postId: number;

  @ManyToOne(() => CommunityEntity, (post) => post.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'postId', referencedColumnName: 'id' })
  post: CommunityEntity;
}
