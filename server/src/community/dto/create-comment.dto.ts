import { IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  public title: string;

  @IsString()
  public content: string;
}
