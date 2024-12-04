import type { Request, RequestHandler, Response } from "express";
import { productService } from "@/api/products/productService";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

class ProductController {
  public getProducts: RequestHandler = async (_req: Request, res: Response) => {
    const serviceResponse = await productService.getAllProducts();
    return handleServiceResponse(serviceResponse, res);
  };
  public addProduct: RequestHandler = async (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).json({ error: "Image file is required." });
    }
    const {name,price,description ,stockQuantity} = req.body;
    const serviceResponse = await productService.addProduct(name,price,description ,stockQuantity, req.file);
    return handleServiceResponse(serviceResponse, res);
  };
}

export const productController = new ProductController();
