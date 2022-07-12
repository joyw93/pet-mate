import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-kakao';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      callbackURL: 'http://127.0.0.1:3000/user/kakao/callback',
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done,
  ) {
    const user = profile;

    console.log(profile);
    done(null, user);

    // const googleUser = await this.authService.validateGoogleUser(
    //   user.email,
    //   user.name,
    //   accessToken,
    // );
    // return done(null, googleUser);
  }
}
