import { Router } from "express";
import * as prodService from "./products.service.js";
import { authentication } from "../../middlewares/authentication.middleware.js";
import { authorization } from "../../middlewares/authorization.middleware.js";
import { validation } from "../../middlewares/validation.middleware.js";
import { createProductSchema, listProductsSchema, productWithIdSchema, updateProductWithIdSchema, deleteProductWithIdSchema } from "./products.validation.schema.js";
import { limiter } from "../../security/limiter.js";

const router = Router();

router.post("/product", authentication, authorization(["admin"]), limiter, validation(createProductSchema), prodService.createProduct);
router.get("/product", limiter, validation(listProductsSchema), prodService.listProducts);
router.get("/product/:productId", authentication, authorization(["staff", "admin"]), limiter, validation(productWithIdSchema), prodService.productWithId);
router.patch("/product/:productId", authentication, authorization(["admin"]), limiter, validation(updateProductWithIdSchema), prodService.updateProductWithId);
router.delete("/product/:productId", authentication, authorization(["admin"]), limiter, validation(deleteProductWithIdSchema), prodService.freezeProductWithId);
router.delete("/product/freeze/:productId", authentication, authorization(["admin"]), limiter, validation(deleteProductWithIdSchema), prodService.deleteProductWithId);

export default router;
