import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EditAccountDto {
  @IsNotEmpty()
  @IsString()
  public currentPassword: string;

  @IsOptional()
  @IsString()
  public newPassword: string;

  
}
