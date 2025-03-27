import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { ProductMongoRepository } from "../repositories/product-mongo.repository";
import { FindByIdProductUseCase } from "../../application/use-cases/find-by-id-product.usecase";
import { CreateProductUseCase } from "../../application/use-cases/create-product.usecase";
import { UpdateProductUseCase } from "../../application/use-cases/update-product.usecase";
import { authGuard } from "../../../../middlewares/auth.guard";
import { FindAllProductUseCase } from "../../application/use-cases/find-all-product.usecase";

const productMongoRepository = new ProductMongoRepository();

const findAllProductUseCase = new FindAllProductUseCase(productMongoRepository);
const findByIdProductUseCase = new FindByIdProductUseCase(
  productMongoRepository,
);

const createProductUseCase = new CreateProductUseCase(productMongoRepository);
const updateProductUseCase = new UpdateProductUseCase(productMongoRepository);

const productController = new ProductController(
  findAllProductUseCase,
  findByIdProductUseCase,
  createProductUseCase,
  updateProductUseCase,
);

const productRouter = Router();

productRouter.get(
  "/",
  authGuard,
  productController.findAll.bind(productController),
);

productRouter.get(
  "/:productId",
  authGuard,
  productController.findById.bind(productController),
);

productRouter.post(
  "/",
  authGuard,
  productController.create.bind(productController),
);
productRouter.patch(
  "/:productId",
  authGuard,
  productController.update.bind(productController),
);

export { productRouter };
