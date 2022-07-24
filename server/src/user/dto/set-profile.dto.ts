import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SetProfileDto {
  @IsNotEmpty()
  @IsString()
  public nickname: string;

}

