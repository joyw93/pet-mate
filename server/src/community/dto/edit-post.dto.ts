import { IsNumber, IsOptional, IsString } from 'class-validator';

export class EditPostDto {
  @IsString()
  public title: string;

  @IsString()
  public content: string;

  @IsOptional()
  public hashtags: string[] | string;
}
