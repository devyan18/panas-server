import { type ProductRepository } from "../interfaces/product-repository.interface";
import { CreateProductDto } from "../dto/create-product.dto";
import { Product } from "../../domain/entities/product.entity";

export class CreateProducUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(createProductDto: CreateProductDto): Promise<Product> {
    const product = new Product(
      "",
      createProductDto.name,
      createProductDto.price,
      createProductDto.stock,
      createProductDto.idealStock,
      createProductDto.whereItBought,
    );

    return await this.productRepository.create(product);
  }
}
