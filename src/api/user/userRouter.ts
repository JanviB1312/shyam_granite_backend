import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";
import { createApiBody, createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { GetUserSchema, UserSchema, UserSignInSchema } from "@/api/user/userModel";
import { validateRequest } from "@/common/utils/httpHandlers";
import { userController } from "./userController";

export const userRegistry = new OpenAPIRegistry();
export const userRouter: Router = express.Router();

userRegistry.register("User", UserSchema);



/* userRegistry.registerPath({
  method: "get",
  path: "/users/{id}",
  tags: ["User"],
  request: { params: GetUserSchema.shape.params },
  responses: createApiResponse(UserSchema, "Success"),
}); */

/* userRouter.get("/:id", validateRequest(GetUserSchema), userController.getUser); */

userRegistry.registerPath({
  method: "post",
  path: "/users/signin",
  tags: ["User"],
  requestBody: createApiBody(UserSignInSchema),
  responses: createApiResponse(z.object({ token: z.string() }), "Success"),
});

userRouter.post("/signin", userController.signIn);


 
 
