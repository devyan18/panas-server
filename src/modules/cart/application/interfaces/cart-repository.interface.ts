import { Cart, type ProductShop } from "../../domain/entities/cart.entity";
import type { CreateCartDto } from "../dto/create-cart.dto";

export interface CartRepository {
  findAll(): Promise<Cart[]>;
  create(cart: Cart): Promise<Cart>;
}
