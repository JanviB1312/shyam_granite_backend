import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";
import { createApiBody, createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { orderController } from "./orderController";
import { OrderSchema, OrderAddSchema } from "./orderModel";

export const orderRegistry = new OpenAPIRegistry();
export const orderRouter: Router = express.Router();

orderRegistry.register("Orders", OrderSchema);

orderRegistry.registerPath({
  method: "get",
  path: "/orders",
  tags: ["Orders"],
  responses: createApiResponse(z.array(OrderSchema), "Success"),
});

orderRouter.get("/", orderController.getOrders);

orderRegistry.registerPath({
  method: "post",
  path: "/orders/save",
  tags: ["Orders"],
  requestBody: createApiBody(OrderAddSchema),
  responses: createApiResponse(z.object({ message: z.string() }), "Success"),
});

orderRouter.post("/save", orderController.saveOrder);

/* orderRegistry.registerPath({
    method: "get",
    path: "/orders/cashfree/:orderId",
    tags: ["Orders"],
    responses: createApiResponse(z.object({ message: z.string(), data: z.any() }), "Success"),
  });
  
  orderRouter.get("/cashfree/:orderId", orderController.getCashfreeOrder); */