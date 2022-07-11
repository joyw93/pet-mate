import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  public title: string;

  @IsString()
  public content: string;

  @IsArray()
  public hashtags: string[]
}
