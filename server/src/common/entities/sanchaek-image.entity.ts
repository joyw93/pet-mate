import { SanchaekEntity } from 'src/sanchaek/sanchaek.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('SanchaekImage')
export class SanchaekImageEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'url' })
  url: string;

  @Column('int', { name: 'sanchaek_id' })
  sanchaek_id: number;

  @ManyToOne(() => SanchaekEntity, (sanchaek) => sanchaek.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'sanchaek_id', referencedColumnName: 'id' })
  sanchaek: SanchaekEntity;
}
