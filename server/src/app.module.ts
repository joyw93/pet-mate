import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import * as ormconfig from '../ormconfig';
import { UserService } from './user/user.service';
import { UserEntity } from './user/user.entity';
import { CommunityModule } from './community/community.module';
import { CommunityEntity } from './community/community.entity';
import { CommunityLikeEntity } from './common/entities/community-like.entity';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot(ormconfig),
    TypeOrmModule.forFeature([UserEntity, CommunityEntity, CommunityLikeEntity]),
    AuthModule,
    CommunityModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
