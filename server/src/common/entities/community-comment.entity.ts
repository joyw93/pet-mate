import { CommunityEntity } from 'src/community/community.entity';
import { UserEntity } from 'src/user/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('CommunityComment')
export class CommunityCommentEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'title' })
  title: string;

  @Column('text', { name: 'content' })
  content: string;

  @Column('int', {name:'author_id'})
  author_id: number;

  @Column('int', {name:'post_id'})
  post_id: number;

  @ManyToOne(() => UserEntity, (author) => author.comments, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'author_id', referencedColumnName: 'id' })
  author: UserEntity;

  @ManyToOne(() => CommunityEntity, (post) => post.comments, {
    onDelete:'CASCADE'
  })
  @JoinColumn({ name: 'post_id', referencedColumnName: 'id' })
  post: CommunityEntity;
}
