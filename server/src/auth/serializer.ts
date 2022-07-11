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

  serializeUser(user, done: CallableFunction) {
    console.log(user);
    done(null, user.email);
  }

  async deserializeUser(userEmail: string, done) {
    console.log(userEmail);
    const user = await this.userRepository.findOne({
      where: { email: userEmail },
    });
    console.log(user)
    done(null, user);
    // return await this.userRepository
    //   .findOne({
    //     where: { email: userEmail },
    //   })
    //   .then((user) => {
    //     done(null, user);
    //   })
    //   .catch((error) => {
    //     done(error);
    //   });
  }
}
