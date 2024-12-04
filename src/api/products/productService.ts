import { StatusCodes } from "http-status-codes";
import { ProductRepository } from "@/api/products/productRepository";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";
import { Product } from "./productModel";
import path from "path";
import fs from "fs/promises";


class ProductService {
  private productRepository: ProductRepository;

  constructor(repository: ProductRepository = new ProductRepository()) {
    this.productRepository = repository;
  }

  async getAllProducts(): Promise<ServiceResponse<Product[] | null>> {
    try {
      const response = await this.productRepository.getAllProducts();
      console.log("RES",response);
      const productsWithBase64 = await Promise.all(
        response.map(async (product) => {
          if (product.image) {
            try {
              const imageData = await fs.readFile(product.image);
              product.imageBase64 = imageData.toString("base64"); 
            } catch (err) {
              console.error(`Error reading image for product ${product.id}:`, err);
            }
          } 
          return product;
        })
      );
      return ServiceResponse.success<Product[]>("Products found", response);
    } catch (e) {
      const errorMessage = `Error occurred while fetching product: ${e}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while fetching products",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
  async addProduct(
    name:string,price:number,description:string ,stockQuantity:number,
    file: Express.Multer.File
  ): Promise<ServiceResponse<Product | null>> {
    try {
      
      const destinationPath = path.join(
        "D:/shyamGraniteBackend/images",
        file.originalname
      );

      await fs.rename(file.path, destinationPath);

      const savedProduct = await this.productRepository.addProduct(name,price,description ,stockQuantity,destinationPath);

      return ServiceResponse.success<Product>("Product added successfully", savedProduct);
    } catch (e) {
      const errorMessage = `Error occurred while adding product: ${e}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while adding the product",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export const productService = new ProductService();
