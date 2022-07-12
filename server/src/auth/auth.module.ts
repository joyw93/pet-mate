import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { LocalStrategy } from './local/local.strategy';
import { Serializer } from './serializer';
import { GoogleStrategy } from './google/google.strategy';
import { KakaoStrategy } from './kakao/kakao.strategy';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    Serializer,
    GoogleStrategy,
    KakaoStrategy
  ],
})
export class AuthModule {}
