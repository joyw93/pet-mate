import { SanchaekImageEntity } from 'src/common/entities/sanchaek-image.entity';
import { SanchaekMapEntity } from 'src/common/entities/sanchaek-map.entity';
import { UserEntity } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Sanchaek')
export class SanchaekEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'title' })
  title: string;

  @Column('text', { name: 'content' })
  content: string;

  @Column('int', { name: 'user_id' })
  user_id: number;

  @Column('int', { name: 'map_id' })
  map_id: number;

  @Column('int', { name: 'views', default: 0 })
  views: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.sanchaeks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([
    {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  ])
  user: UserEntity;

  @OneToMany(
    () => SanchaekImageEntity,
    (image: SanchaekImageEntity) => image.sanchaek,
    { cascade: true },
  )
  images: SanchaekImageEntity[];

  @OneToOne(() => SanchaekMapEntity, (mapInfo: SanchaekMapEntity) => mapInfo.sanchaek, {
    cascade: true,
  })
  @JoinColumn({ name: 'map_id', referencedColumnName: 'id' })
  mapInfo: SanchaekMapEntity;
}
