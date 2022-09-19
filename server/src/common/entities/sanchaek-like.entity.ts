import { SanchaekEntity } from 'src/sanchaek/sanchaek.entity';
import { UserEntity } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('SanchaekLike')
export class SanchaekLikeEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'userId' })
  userId: number;

  @Column('int', { name: 'sanchaekId' })
  sanchaekId: number;

  @ManyToOne(() => SanchaekEntity, (sanchaek) => sanchaek.likes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'sanchaekId', referencedColumnName: 'id' })
  sanchaek: SanchaekEntity;

  @ManyToOne(() => UserEntity, (user) => user.likes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: UserEntity;
}
