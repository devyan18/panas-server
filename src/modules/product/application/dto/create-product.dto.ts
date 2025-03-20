import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  MinLength,
} from "class-validator";

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNumber()
  price!: number;

  @IsNumber()
  stock!: number;

  @IsNumber()
  @Min(1)
  idealStock!: number;

  @IsString()
  @MinLength(10)
  whereItBought!: string;
}
