import type { Request, RequestHandler, Response } from "express";
import { orderService } from "@/api/order/orderService";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

class OrderController {
  public getOrders: RequestHandler = async (_req: Request, res: Response) => {
    const serviceResponse = await orderService.getAllOrders();
    return handleServiceResponse(serviceResponse, res);
  };

  public saveOrder: RequestHandler = async (req: Request, res: Response) => {
    const {
      orderId,
      customerId,
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      order_amount,
      products,
    } = req.body;

    const serviceResponse = await orderService.saveOrder(orderId,customerId,customerName,customerEmail,customerPhone,customerAddress,order_amount,products);

    return handleServiceResponse(serviceResponse, res);
  };
 /*  public getCashfreeOrder: RequestHandler = async (req: Request, res: Response) => {
    const { orderId } = req.params;

    const serviceResponse = await orderService.fetchCashfreeOrder(orderId);

    return handleServiceResponse(serviceResponse, res);
  }; */
}

export const orderController = new OrderController();
