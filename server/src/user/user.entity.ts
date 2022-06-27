import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 60 })
  email: string;

  @Column({ length: 60 })
  nickname: string;

  @Column({ length: 255 })
  password: string;
}