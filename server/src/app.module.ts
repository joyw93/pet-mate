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
import { UserProfileEntity } from './common/entities/user-profile.entity';
import { SanchaekModule } from './sanchaek/sanchaek.module';
import { SanchaekEntity } from './sanchaek/sanchaek.entity';
import { MarketModule } from './market/market.module';
import { SearchModule } from './search/search.module';
import * as ormconfig from '../ormconfig';
import { SanchaekLikeEntity } from './common/entities/sanchaek-like.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    TypeOrmModule.forFeature([
      UserEntity,
      UserProfileEntity,
      CommunityEntity,
      CommunityLikeEntity,
      CommunityHashtagEntity,
      SanchaekEntity,
      SanchaekLikeEntity
    ]),
    UserModule,
    AuthModule,
    CommunityModule,
    HashtagModule,
    SanchaekModule,
    MarketModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
