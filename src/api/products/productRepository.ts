import type { Product } from "@/api/products/productModel";
import { query } from "@/common/models/database";

export class ProductRepository {
  async getAllProducts(): Promise<Product[]> {
    const sql = `SELECT * FROM products`;
    const result = await query(sql);
    return result;
  }
  async addProduct(
    name: string,
    price: number,
    description: string,
    stockQuantity: number,
    image: string,
    features: string[]
): Promise<Product> {
    const sql = `
        INSERT INTO products (name, price, description, stock_quantity, image, features)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
    `;

    const result = await query(sql, [name, price, description, stockQuantity, image, features]);
    return result[0];
}

async editProduct(productData: Product): Promise<Product | null> {
  let sql: string;
  let values: any[];
  console.log("product data",productData);
  if (productData.image !== undefined) {
    sql = `
      UPDATE products
      SET 
        name = $1,
        price = $2,
        description = $3,
        stock_quantity = $4,
        image = $5,
        features = $6,
        updated_at = NOW()
      WHERE id = $7
      RETURNING *;
    `;
    values = [
      productData.name,
      productData.price,
      productData.description,
      productData.stock_quantity,
      productData.image,
      productData.features || null, // Use null if features are not provided
      productData.id,
    ];
  } else {
    sql = `
      UPDATE products
      SET 
        name = $1,
        price = $2,
        description = $3,
        stock_quantity = $4,
        features = $5,
        updated_at = NOW()
      WHERE id = $6
      RETURNING *;
    `;
    values = [
      productData.name,
      productData.price,
      productData.description,
      productData.stock_quantity,
      productData.features || null, // Use null if features are not provided
      productData.id,
    ];
  }

  const result = await query(sql, values);
  return result[0] || null;
}

  async getProductById(id: number): Promise<Product | null> {
    const sql = `SELECT * FROM products WHERE id = $1 LIMIT 1`;
    const result = await query(sql, [id]);
    return result[0] || null;
  }
  
}
