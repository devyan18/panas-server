import { type ProductRepository } from "../../application/interfaces/product-repository.interface";
import { ProductModel, type IProduct } from "../schemas/product.schema";
import { Product } from "../../domain/entities/product.entity";

export class ProductMongoRepository implements ProductRepository {
  private adapter(product: IProduct): Product {
    return new Product(
      product.id,
      product.name,
      product.price,
      product.stock,
      product.idealStock,
      product.whereItBought,
    );
  }

  async findById(productId: string): Promise<Product | null> {
    const productFound = await ProductModel.findOne({ _id: productId }).exec();

    if (!productFound) return null;

    return this.adapter(productFound);
  }

  async findAll(): Promise<Product[]> {
    const products = await ProductModel.find();

    return products.map(product => this.adapter(product));
  }

  async create(product: Product): Promise<Product> {
    console.log(product);

    const createdProduct = await ProductModel.create({
      name: product.name,
      price: product.price,
      stock: product.stock,
      idealStock: product.idealStock,
      whereItBought: product.whereItBought,
    });

    if (!createdProduct) throw new Error("Problems");

    return this.adapter(createdProduct);
  }

  async update(product: Product): Promise<Product> {
    throw new Error("Method not implemented.");
  }
  async delete(productId: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
