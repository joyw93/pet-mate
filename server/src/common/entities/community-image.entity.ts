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

  @Column('int', { name: 'post_id' })
  post_id: number;

  @ManyToOne(() => CommunityEntity, (post) => post.imgUrls, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'post_id', referencedColumnName: 'id' })
  post: CommunityEntity;
}
