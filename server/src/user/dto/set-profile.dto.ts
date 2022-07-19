import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SetProfileDto {
  @IsNotEmpty()
  @IsString()
  public nickname: string;

  @IsString()
  public birthday: string;

  @IsString()
  public comment: string;
}
