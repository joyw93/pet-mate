import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  public title: string;

  @IsString()
  public content: string;

  @IsOptional()
  @IsArray()
  public hashtags: string[]
}
