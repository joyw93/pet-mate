import { CommunityHashtagEntity } from 'src/common/entities/community-hashtag.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Hashtag')
export class HashtagEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'keyword' })
  keyword: string;

  @OneToMany(
    () => CommunityHashtagEntity,
    (tag: CommunityHashtagEntity) => tag.hashtag,
    { cascade: true },
  )
  tags: CommunityHashtagEntity[];
}
