import { SanchaekEntity } from 'src/sanchaek/sanchaek.entity';
import { UserEntity } from 'src/user/user.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('SanchaekComment')
export class SanchaekCommentEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('text', { name: 'content' })
  content: string;

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
}
