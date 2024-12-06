import { query } from "@/common/models/database";
import type { OrderWithProducts } from "./orderModel";

interface Product {
  product_id: number;
  product_name: string;
  product_price: string;
  quantity: number;
}

interface Order {
  order_id: number;
  customer_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address:string;
  order_amount: string;
  created_at: string;
  updated_at: string;
  products: Product[];
}

export class OrderRepository {
  async getAllOrders(): Promise<Order[]> {
    const sql = `
      SELECT 
        o.id AS order_id,
        o.customer_id,
        o.customer_name,
        o.customer_email,
        o.customer_phone,
        o.customer_address,
        o.order_amount,
        o.created_at,
        o.updated_at,
        op.product_id,
        p.name AS product_name,
        p.price AS product_price,
        op.quantity
      FROM "orders" o
      LEFT JOIN orders_products op ON o.id = op.order_id
      LEFT JOIN products p ON op.product_id = p.id
      ORDER BY o.id;
    `;
    const result = await query(sql);
  
    // Group the products by order_id
    const orders = result.reduce((acc: Order[], row: any) => {
      const order = acc.find(item => item.order_id === row.order_id);
      if (order) {
        order.products.push({
          product_id: row.product_id,
          product_name: row.product_name,
          product_price: row.product_price,
          quantity: row.quantity,
        });
      } else {
        acc.push({
          order_id: row.order_id,
          customer_id: row.customer_id,
          customer_name: row.customer_name,
          customer_email: row.customer_email,
          customer_phone: row.customer_phone,
          customer_address:row.customer_address,
          order_amount: row.order_amount,
          created_at: row.created_at,
          updated_at: row.updated_at,
          products: [{
            product_id: row.product_id,
            product_name: row.product_name,
            product_price: row.product_price,
            quantity: row.quantity,
          }],
        });
      }
      return acc;
    }, [] as Order[]);  
    return orders;
  }

  async saveOrder(orderId:string,customerId:string,customerName:string,customerEmail:string,customerPhone:number,customerAddress:string,
    customerState:string,
        customerCity:string,
        customerCountry:string,
    order_amount:number,
    products:Array<any>): Promise<void> {
   

    const orderSql = `
      INSERT INTO orders (order_id, customer_id, customer_name, customer_email, customer_phone, customer_address, customer_country,
	customer_state,
	customer_city,order_amount)
      VALUES ($1, $2, $3, $4, $5, $6, $7,$8,$9,$10)
      RETURNING *;
    `;
    const orderResult = await query(orderSql, [
      orderId,
      customerId,
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      customerCity,
      customerState,
      customerCountry,
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

  async getDiscount(coupon:string): Promise<OrderWithProducts[]> {
    const sql = `SELECT discount_percentage FROM discount WHERE coupon_code=$1`;
    const result = await query(sql,[coupon]);
    return result;
  }
}
