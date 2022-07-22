import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SanchaekImageEntity } from 'src/common/entities/sanchaek-image.entity';
import { SanchaekMapEntity } from 'src/common/entities/sanchaek-map.entity';
import { UserEntity } from 'src/user/user.entity';
import { SanchaekController } from './sanchaek.controller';
import { SanchaekEntity } from './sanchaek.entity';
import { SanchaekService } from './sanchaek.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      SanchaekEntity,
      SanchaekMapEntity,
      SanchaekImageEntity,
    ]),
  ],
  controllers: [SanchaekController],
  providers: [SanchaekService],
})
export class SanchaekModule {}
