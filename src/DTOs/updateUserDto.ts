import { IsString, MinLength, IsOptional } from 'class-validator';

export class UpdatePostDto {
  @IsOptional()
  createdBy: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  title: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  body: string;
}
