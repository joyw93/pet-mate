import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SanchaekCommentLikeEntity } from 'src/common/entities/sanchaek-comment-like.entity';
import { SanchaekCommentEntity } from 'src/common/entities/sanchaek-comment.entity';
import { SanchaekImageEntity } from 'src/common/entities/sanchaek-image.entity';
import { SanchaekLikeEntity } from 'src/common/entities/sanchaek-like.entity';
import { SanchaekMapEntity } from 'src/common/entities/sanchaek-map.entity';
import { UserEntity } from 'src/user/user.entity';
import { SanchaekController } from './sanchaek.controller';
import { SanchaekEntity } from './sanchaek.entity';
import { SanchaekService } from './sanchaek.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      SanchaekLikeEntity,
      SanchaekEntity,
      SanchaekMapEntity,
      SanchaekImageEntity,
      SanchaekCommentEntity,
      SanchaekCommentLikeEntity,
    ]),
  ],
  controllers: [SanchaekController],
  providers: [SanchaekService],
  exports: [SanchaekService],
})
export class SanchaekModule {}
