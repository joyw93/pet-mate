import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {  Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://127.0.0.1:3000/user/google/callback',
      scope: ['email', 'profile'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };

    const exUser = await this.authService.findGoogleUser(user.email);
    // 1. 유저 존재 X  -> 프로퍼티 추가 / 회원가입 처리 / done(null, user)
    // 2. 유저 존재 O -> done(null, user)
    try {
      done(null, user);
    } catch (err) {
      console.log(err);
      done(err, false);
    }
  }
}
