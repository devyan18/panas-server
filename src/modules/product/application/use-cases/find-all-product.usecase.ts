import { type ProductRepository } from "../interfaces/product-repository.interface";
import { Product } from "../../domain/entities/product.entity";

export class FindAllProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(): Promise<Product[]> {
    const products = await this.productRepository.findAll();

    return products;
  }
}
