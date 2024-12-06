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

    const { name, price, description, stockQuantity, features } = req.body;
    const featuresArray = JSON.parse(features); // Ensure features are sent as a JSON array

    const serviceResponse = await productService.addProduct(
        name,
        price,
        description,
        stockQuantity,
        req.file,
        featuresArray
    );
    return handleServiceResponse(serviceResponse, res);
};
public editProduct: RequestHandler = async (req: Request, res: Response) => {
  const { id, name, price, description, stockQuantity, features } = req.body;
  const file = req.file;

  const productData = {
    id: parseInt(id, 10),
    name,
    price: parseFloat(price),
    description,
    stock_quantity: parseInt(stockQuantity, 10),
    features: features ? JSON.parse(features) : undefined, // Parse features if provided
    image: file ? file.path : undefined,
  };

  const serviceResponse = await productService.editProduct(productData);
  return handleServiceResponse(serviceResponse, res);
};

  public getProductById: RequestHandler = async (req: Request, res: Response) => {
    const {id} = req.params;
    const serviceResponse = await productService.getProductById(parseInt(id));
    return handleServiceResponse(serviceResponse, res);
  };
}

export const productController = new ProductController();
