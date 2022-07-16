import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { UserEntity } from './user/user.entity';
import { CommunityModule } from './community/community.module';
import { CommunityEntity } from './community/community.entity';
import { CommunityLikeEntity } from './common/entities/community-like.entity';
import { HashtagModule } from './hashtag/hashtag.module';
import { CommunityHashtagEntity } from './common/entities/community-hashtag.entity';
import * as ormconfig from '../ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    TypeOrmModule.forFeature([
      UserEntity,
      CommunityEntity,
      CommunityLikeEntity,
      CommunityHashtagEntity,
    ]),
    UserModule,
    AuthModule,
    CommunityModule,
    HashtagModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
