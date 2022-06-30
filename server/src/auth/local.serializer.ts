import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';

@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {
    super();
  }

  serializeUser(user: UserEntity, done: CallableFunction) {
    console.log(user);
    done(null, user.email);
  }

  async deserializeUser(userId: string, done: CallableFunction) {
    return await this.userRepository
      .findOne({
        where: { id: +userId },
      })
      .then((user) => {
        console.log('user', user);
        done(null, user);
      })
      .catch((error) => {
        done(error);
      });
  }
}
