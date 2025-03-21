import { type ProductRepository } from "../interfaces/product-repository.interface";
import { UpdateProductDto } from "../dto/update-product.dto";
import { Product } from "../../domain/entities/product.entity";

export class UpdateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: string, dto: UpdateProductDto): Promise<Product> {
    const productFound = await this.productRepository.findById(id);

    if (!productFound) throw new Error("Product not found");

    if (dto.price && dto.price < 0)
      throw new Error("Price must be greater than 0");

    if (dto.stock && dto.stock < 0)
      throw new Error("Stock not must be negative");

    const product = new Product(
      id,
      productFound.name,
      dto.price || productFound.price,
      dto.stock || productFound.stock,
      dto.idealStock || productFound.idealStock,
      dto.whereItBought || productFound.whereItBought,
    );

    return await this.productRepository.update(product);
  }
}
