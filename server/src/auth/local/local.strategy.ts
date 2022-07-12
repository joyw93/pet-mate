import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import * as res from '../../common/responses/message';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  async validate(email: string, password: string, done: CallableFunction) {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException(res.msg.LOGIN_USER_NOT_EXIST);
    }
    return done(null, user);
  }
}