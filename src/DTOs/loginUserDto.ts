import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginUserDTO {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(7)
  password: string;
}
