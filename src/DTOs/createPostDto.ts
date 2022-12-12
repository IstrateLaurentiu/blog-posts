import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  createdBy: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  body: string;
}
