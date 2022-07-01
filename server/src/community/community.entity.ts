import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Community')
export class CommunityEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column()
  userId: number;

  @Column({ length: 60 })
  title: string;

  @Column({ length: 255 })
  content: string;

}
