import { IsEmail, IsString } from 'class-validator';

export class SetProfileDto {

  @IsString()
  public nickname: string;

  @IsString()
  public birthday: string;

  @IsString()
  public comment: string;
}
