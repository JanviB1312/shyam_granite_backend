import type { Product } from "@/api/products/productModel";
import { query } from "@/common/models/database";

export class ProductRepository {
  async getAllProducts(): Promise<Product[]> {
    const sql = `SELECT * FROM products`;
    const result = await query(sql);
    return result;
  }
  async addProduct(name:string,price:number,description:string ,stockQuantity:number,image:string): Promise<Product> {
    const sql = `
      INSERT INTO products (name, price, description, stock_quantity, image)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    const result = await query(sql, [name,price,description ,stockQuantity,image]);
    return result[0];
  }
}
