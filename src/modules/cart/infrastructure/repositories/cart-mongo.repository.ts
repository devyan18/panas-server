import { type CartRepository } from "../../application/interfaces/cart-repository.interface";
import { CartModel, type ICart } from "../schemas/cart.schema";
import { Cart, type ProductShop } from "../../domain/entities/cart.entity";

export class CartMongoRepository implements CartRepository {
  findAll(): Promise<Cart[]> {
    throw new Error("Method not implemented.");
  }
  create(listOfProducts: ProductShop[]): Promise<Cart> {
    throw new Error("Method not implemented.");
  }
}
