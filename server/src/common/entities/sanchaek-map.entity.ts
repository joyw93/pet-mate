import { SanchaekEntity } from 'src/sanchaek/sanchaek.entity';
import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('SanchaekMap')
export class SanchaekMapEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'lat' })
  lat: string;

  @Column('varchar', { name: 'lng' })
  lng: string;

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
