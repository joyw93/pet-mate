import { UserEntity } from 'src/user/user.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity('UserProfile')
export class UserProfileEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'imageUrl', nullable: true })
  imageUrl: string;

  @Column('varchar', { name: 'comment', nullable: true })
  comment: string;

  @Column('varchar', { name: 'birth', nullable: true })
  birth: string;

  @OneToOne(() => UserEntity, (user: UserEntity) => user.profile, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;
}
