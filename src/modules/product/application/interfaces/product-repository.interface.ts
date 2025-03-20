import { Product } from "../../domain/entities/product.entity";

export interface ProductRepository {
  findById(productId: string): Promise<Product | null>;
  findAll(): Promise<Product[]>;

  create(product: Product): Promise<Product>;
  update(product: Product): Promise<Product>;
  delete(productId: string): Promise<void>;
}
