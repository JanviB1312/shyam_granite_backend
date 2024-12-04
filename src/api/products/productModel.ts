import { z } from "zod";

export type Product = z.infer<typeof ProductSchema>;
export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  price:z.number(),
  description: z.string(),
  stock_quantity:z.number(),
  image:z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  imageBase64:z.string().optional()
});

export const ProductAddSchema = z.object({
  name:z.string(),
  price:z.number(),
  description:z.string(),
  stock_quantity:z.number(),
  image:z.any()
});