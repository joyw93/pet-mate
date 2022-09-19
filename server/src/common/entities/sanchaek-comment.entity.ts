import { SanchaekEntity } from 'src/sanchaek/sanchaek.entity';
import { UserEntity } from 'src/user/user.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SanchaekCommentLikeEntity } from './sanchaek-comment-like.entity';

@Entity('SanchaekComment')
export class SanchaekCommentEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('text', { name: 'content' })
  content: string;

  @Column('int', { name: 'parentId', nullable: true })
  parentId: number;

  @Column('int', { name: 'depth', default: 0 })
  depth: number;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @ManyToOne(() => UserEntity, (author) => author.sanchaekComments, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'authorId', referencedColumnName: 'id' })
  author: UserEntity;

  @ManyToOne(() => SanchaekEntity, (sanchaek) => sanchaek.comments, {
    onDelete:'CASCADE'
  })
  @JoinColumn({ name: 'sanchaekId', referencedColumnName: 'id' })
  sanchaek: SanchaekEntity;

  @OneToMany(
    () => SanchaekCommentLikeEntity,
    (like: SanchaekCommentLikeEntity) => like.comment,
    {
      cascade: true,
    },
  )
  likes: SanchaekCommentLikeEntity[];
}
