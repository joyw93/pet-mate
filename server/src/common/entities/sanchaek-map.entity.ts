import { SanchaekEntity } from 'src/sanchaek/sanchaek.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('SanchaekMap')
export class SanchaekMapEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('float', { name: 'lat' })
  lat: number;

  @Column('float', { name: 'lng' })
  lng: number;

  @Column('varchar', { name: 'location' })
  location: string;

  @Column('varchar', { name: 'address' })
  address: string;

  @Column('varchar', { name: 'road_address' })
  roadAddress: string;

  @OneToOne(() => SanchaekEntity, (sanchaek) => sanchaek.mapInfo, {
    onDelete: 'CASCADE',
  })
  sanchaek: SanchaekEntity;
}
