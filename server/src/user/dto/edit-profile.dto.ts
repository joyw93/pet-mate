import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EditProfileDto {
  @IsNotEmpty()
  @IsString()
  public nickname: string;

  @IsOptional()
  @IsString()
  public birthday: string;

  @IsOptional()
  @IsString()
  public comment: string;
}
