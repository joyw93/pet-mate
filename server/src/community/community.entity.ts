import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Community')
export class CommunityEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'UserId' })
  UserId: number;

  @Column('varchar', { name: 'title' })
  title: string;

  @Column('text', { name: 'content' })
  content: string;
}
