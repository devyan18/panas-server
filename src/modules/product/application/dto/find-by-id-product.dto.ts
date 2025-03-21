import { IsMongoId, IsString } from "class-validator";

export class FindByIdProductDto {
  @IsString()
  @IsMongoId()
  productId!: string;
}
