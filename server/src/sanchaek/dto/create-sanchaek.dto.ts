import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class MapInfo {
  @IsString()
  public lat: string;
  @IsString()
  public lng: string;
  @IsString()
  public location: string;
  @IsString()
  public address: string;
  @IsString()
  public roadAddress: string;
}

export class CreateSanchaekDto {
  @IsString()
  public title: string;

  @IsString()
  public content: string;

  @IsObject()
  @ValidateNested()
  @Type(() => MapInfo)
  public mapInfo: MapInfo;
}
