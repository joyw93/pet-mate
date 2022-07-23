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

  @Column('int', { name: 'sanchaekId' })
  sanchaekId: number;

  @ManyToOne(() => SanchaekEntity, (sanchaek) => sanchaek.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'sanchaekId', referencedColumnName: 'id' })
  sanchaek: SanchaekEntity;
}
