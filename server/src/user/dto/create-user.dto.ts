import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  public email: string;

  @IsString()
  public nickname: string;

  @IsString()
  public password: string;
}
