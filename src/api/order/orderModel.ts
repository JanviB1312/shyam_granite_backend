import { z } from "zod";

export type Order = z.infer<typeof OrderSchema>;
export type OrderWithProducts = z.infer<typeof OrderWithProductsSchema>;

export const OrderSchema = z.object({
  id: z.number(),
  order_id: z.string(),
  customer_id: z.string().optional(),
  customer_name: z.string(),
  customer_email: z.string(),
  customer_phone: z.string(),
  order_amount: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const ProductSchema = z.object({
  product_id: z.number(),
  quantity: z.number(),
  price: z.number(),
});

export const OrderWithProductsSchema = OrderSchema.extend({
  products: z.array(ProductSchema),
});

export const OrderAddSchema = z.object({
  orderId: z.string(),
  customerId: z.string().optional(),
  customerName: z.string(),
  customerEmail: z.string(),
  customerPhone: z.number(),
  customerAddress:z.string(),
  order_amount: z.number(),
  products: z.array(ProductSchema),
});
