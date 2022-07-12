import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { LocalStrategy } from './local.strategy';
import { Serializer } from './serializer';
import { GoogleStrategy } from './google.strategy';

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
  ],
})
export class AuthModule {}
