// Usar un único array con discriminador
import { Type } from "class-transformer";
import {
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  Min,
  ValidateIf,
  ValidateNested,
} from "class-validator";
import {
  CreateProductDto,
  ProductDto,
} from "../../../product/application/dto/create-product.dto";

class BaseCartItemDto extends ProductDto {
  @IsBoolean()
  isExisting!: boolean;

  @IsNumber()
  @IsPositive()
  quantity!: number;

  @IsNumber()
  @Min(0)
  totalPrice!: number;

  @IsNumber()
  @Min(0)
  discount!: number;

  @IsNumber()
  @Min(0)
  finalPrice!: number;
}

class ExistingProductItemDto extends BaseCartItemDto {
  @IsMongoId()
  productId!: string;

  @ValidateIf(o => o.isExisting === true)
  @IsNotEmpty()
  @Type(() => ProductDto)
  productDetails?: ProductDto; // Opcional si solo se usa ID
}

class NewProductItemDto extends BaseCartItemDto {
  @ValidateNested()
  @Type(() => CreateProductDto)
  productDetails!: CreateProductDto;
}

export class CreateCartDto {
  @ValidateNested({ each: true })
  @Type(() => Object, {
    discriminator: {
      property: "isExisting",
      subTypes: [
        { value: ExistingProductItemDto, name: "true" },
        { value: NewProductItemDto, name: "false" },
      ],
    },
  })
  items!: (ExistingProductItemDto | NewProductItemDto)[];
}
