import { SanchaekCommentEntity } from 'src/common/entities/sanchaek-comment.entity';
import { SanchaekImageEntity } from 'src/common/entities/sanchaek-image.entity';
import { SanchaekLikeEntity } from 'src/common/entities/sanchaek-like.entity';
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

  @Column('boolean', {name:'temporary', default: false})
  temporary: boolean;

  @Column('int', { name: 'userId' })
  userId: number;

  @Column('int', { name: 'mapId' })
  mapId: number;

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
      name: 'userId',
      referencedColumnName: 'id',
    },
  ])
  user: UserEntity;

  @OneToMany(
    () => SanchaekCommentEntity,
    (comment: SanchaekCommentEntity) => comment.sanchaek,
    { cascade: true },
  )
  comments: SanchaekCommentEntity[];

  @OneToMany(
    () => SanchaekImageEntity,
    (image: SanchaekImageEntity) => image.sanchaek,
    { cascade: true },
  )
  images: SanchaekImageEntity[];

  @OneToMany(
    () => SanchaekLikeEntity,
    (like: SanchaekLikeEntity) => like.sanchaek,
    {
      cascade: true,
    },
  )
  likes: SanchaekLikeEntity[];

  @OneToOne(
    () => SanchaekMapEntity,
    (mapInfo: SanchaekMapEntity) => mapInfo.sanchaek,
    {
      cascade: true,
    },
  )
  @JoinColumn({ name: 'mapId', referencedColumnName: 'id' })
  mapInfo: SanchaekMapEntity;
}
