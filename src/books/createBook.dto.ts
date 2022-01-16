import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class createBookDto {
  @IsString()
  @MaxLength(30)
  public readonly title: string;

  @IsString()
  @MaxLength(150)
  public readonly description: string;

  @IsString()
  @IsOptional()
  public readonly authors: string;

  @IsBoolean()
  @IsOptional()
  public readonly favorite: boolean;

  @IsString()
  @IsOptional()
  public readonly fileCover: string;

  @IsString()
  @IsOptional()
  public readonly fileName: string;
}
