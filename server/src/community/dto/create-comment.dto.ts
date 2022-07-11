import { IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {

  @IsString()
  public content: string;
}
