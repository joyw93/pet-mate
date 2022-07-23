import { IsNumber, IsOptional, IsString } from 'class-validator';

export class EditSanchaekDto {
  @IsString()
  public title: string;

  @IsString()
  public content: string;

  @IsOptional()
  public images: string[];

}
