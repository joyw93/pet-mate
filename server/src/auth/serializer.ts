import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';

@Injectable()
export class Serializer extends PassportSerializer {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {
    super();
  }

  serializeUser(user:UserEntity, done: CallableFunction) {
    done(null, user.id);
  }

  async deserializeUser(userId: number, done: CallableFunction) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    done(null, user);
  }
}
