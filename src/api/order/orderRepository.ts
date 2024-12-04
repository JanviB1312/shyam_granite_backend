import { query } from "@/common/models/database";
import type { OrderWithProducts } from "./orderModel";

export class OrderRepository {
  async getAllOrders(): Promise<OrderWithProducts[]> {
    const sql = `
      SELECT 
            o.id AS order_id,
            o.customer_id,
            o.customer_name,
            o.customer_email,
            o.customer_phone,
            o.order_amount,
            o.created_at,
            o.updated_at,
            op.product_id,
            p.name AS product_name,
            p.price AS product_price,
            op.quantity,
            op.total_price
        FROM "order" o
        LEFT JOIN order_products op ON o.id = op.order_id
        LEFT JOIN products p ON op.product_id = p.id
        ORDER BY o.id;
    `;
    const result = await query(sql);
    return result.rows;
  }

  async saveOrder(orderId:string,customerId:string,customerName:string,customerEmail:string,customerPhone:number,customerAddress:string,order_amount:number,
    products:Array<any>): Promise<void> {
   

    const orderSql = `
      INSERT INTO orders (order_id, customer_id, customer_name, customer_email, customer_phone, customer_address, order_amount)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
    const orderResult = await query(orderSql, [
      orderId,
      customerId,
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      order_amount,
    ]);
    console.log("res",orderResult);
    const orderIdDb = orderResult[0].id;

    const productSql = `
      INSERT INTO orders_products (order_id, product_id, quantity,total_price)
      VALUES ($1, $2, $3,$4);
    `;
    console.log("products",products);
    for (const product of products) {
      await query(productSql, [orderIdDb, product.id, product.quantity,product.price]);
    }
  }
}
