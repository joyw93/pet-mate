import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  public title: string;

  @IsString()
  public content: string;

  @IsOptional()
  public hashtags: string[] | string;
}
