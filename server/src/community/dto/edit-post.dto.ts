import { IsNumber, IsString } from 'class-validator';

export class EditPostDto {
  @IsString()
  public title: string;

  @IsString()
  public content: string;
}
