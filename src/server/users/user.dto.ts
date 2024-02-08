import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  // Include any other fields you need for registration
}
export class LoginUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class serRoleUserDto {
  @IsEmail()
  email: string;

  @IsString()
  role: string;
}


