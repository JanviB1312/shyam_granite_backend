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
      //console.log("RES",response);
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
    name: string,
    price: number,
    description: string,
    stockQuantity: number,
    file: Express.Multer.File,
    features: string[]
): Promise<ServiceResponse<Product | null>> {
    try {
        const destinationPath = path.join(
            "D:/shyamGraniteBackend/images",
            file.originalname
        );

        await fs.rename(file.path, destinationPath);

        const savedProduct = await this.productRepository.addProduct(
            name,
            price,
            description,
            stockQuantity,
            destinationPath,
            features
        );

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


async editProduct(productData: any): Promise<ServiceResponse<Product | null>> {
  try {
    if (productData.image) {
      const destinationPath = path.join(
        "D:/shyamGraniteBackend/images",
        path.basename(productData.image)
      );
      await fs.rename(productData.image, destinationPath);
      productData.image = destinationPath;
    }

    const updatedProduct = await this.productRepository.editProduct(productData);

    if (!updatedProduct) {
      return ServiceResponse.failure(
        "Failed to update the product",
        null,
        StatusCodes.BAD_REQUEST
      );
    }

    return ServiceResponse.success<Product>(
      "Product updated successfully",
      updatedProduct
    );
  } catch (e) {
    const errorMessage = `Error occurred while updating product: ${e}`;
    logger.error(errorMessage);
    return ServiceResponse.failure(
      "An error occurred while updating the product",
      null,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

  async getProductById(id: number): Promise<ServiceResponse<Product | null>> {
    try {
      const product = await this.productRepository.getProductById(id);
      if (!product) {
        return ServiceResponse.failure(
          `Product with id ${id} not found`,
          null,
          StatusCodes.NOT_FOUND
        );
      }
      if (product.image) {
        try {
          const imageBuffer = await fs.readFile(product.image);
          product.imageBase64 = imageBuffer.toString("base64");
        } catch (err) {
          logger.warn(`Error reading image file for product ${id}: ${err}`);        
        }
      } 
      return ServiceResponse.success<Product>("Product found", product);
    } catch (e) {
      const errorMessage = `Error occurred while fetching product by name: ${e}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while fetching the product",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
  
}

export const productService = new ProductService();
