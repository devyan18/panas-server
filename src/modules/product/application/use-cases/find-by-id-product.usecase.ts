import { type ProductRepository } from "../interfaces/product-repository.interface";
import { FindByIdProductDto } from "../dto/find-by-id-product.dto";
import { Product } from "../../domain/entities/product.entity";

export class FindByIdProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(
    findByIdProductDto: FindByIdProductDto,
  ): Promise<Product | null> {
    const product = await this.productRepository.findById(
      findByIdProductDto.productId,
    );

    return product;
  }
}
