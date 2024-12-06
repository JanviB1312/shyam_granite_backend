import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";
import { createApiBody, createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { productController } from "./productController";
import { ProductAddSchema, ProductSchema } from "./productModel";
import { upload } from "@/common/middleware/uploadMiddleware";
import { verifyToken } from "@/common/middleware/jwtVerification";

export const productRegistry = new OpenAPIRegistry();
export const productRouter: Router = express.Router();

productRegistry.register("Products", ProductSchema);

productRegistry.registerPath({
  method: "get",
  path: "/products",
  tags: ["Products"],
  responses: createApiResponse(z.array(ProductSchema), "Success"),
});

productRouter.get("/", productController.getProducts);

productRegistry.registerPath({
  method: "post",
  path: "/products/add",
  tags: ["Products"],
  requestBody: createApiBody(ProductAddSchema),
  responses: createApiResponse(z.object({ token: z.string() }), "Success"),
});

productRouter.post("/add", verifyToken, upload.single("image"), productController.addProduct);

productRegistry.registerPath({
  method: "post",
  path: "/products/edit",
  tags: ["Products"],
  requestBody: createApiBody(
    ProductSchema.extend({
      features: z.array(z.string()).optional(),
    })
  ),
  responses: createApiResponse(z.object({ message: z.string() }), "Success"),
});

productRouter.post(
  "/edit",
  verifyToken,
  upload.single("image"),
  productController.editProduct
);


productRegistry.registerPath({
  method: "get",
  path: "/products/:id",
  tags: ["Products"],
  responses: createApiResponse(ProductSchema, "Success"),
});

productRouter.get("/:id", productController.getProductById);



