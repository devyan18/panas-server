import {
  IsNumber,
  IsString,
  MinLength,
  IsOptional,
  Min,
} from "class-validator";

export class UpdateProductDto {
  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsNumber()
  stock?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  idealStock?: number;

  @IsOptional()
  @IsString()
  @MinLength(10)
  whereItBought?: string;
}
