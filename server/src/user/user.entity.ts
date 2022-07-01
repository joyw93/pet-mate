import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ length: 60 })
  name: string;

  @Column({ length: 60 })
  nickname: string;

  @Column({ length: 60 })
  email: string;

  // select: false 추가하기
  @Column({ length: 255 })
  password: string;
}
