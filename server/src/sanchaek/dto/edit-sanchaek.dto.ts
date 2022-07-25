import { Type } from 'class-transformer';
import { IsNumber, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';

class MapInfo {
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

export class EditSanchaekDto {
  @IsString()
  public title: string;

  @IsString()
  public content: string;

  @IsOptional()
  public images: string[];

  @IsObject()
  @ValidateNested()
  @Type(() => MapInfo)
  public mapInfo: MapInfo;
}
