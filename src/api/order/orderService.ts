import { StatusCodes } from "http-status-codes";
import { OrderRepository } from "@/api/order/orderRepository";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";
import { Order, OrderWithProducts,OrderAddSchema } from "./orderModel";


class OrderService {
  private orderRepository: OrderRepository;

  constructor(repository: OrderRepository = new OrderRepository()) {
    this.orderRepository = repository;
  }

  async getAllOrders(): Promise<ServiceResponse<OrderWithProducts[] | null>> {
    try {
      const orders = await this.orderRepository.getAllOrders();
      return ServiceResponse.success<OrderWithProducts[]>("Orders fetched successfully", orders);
    } catch (e) {
      const errorMessage = `Error occurred while fetching orders: ${e}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while fetching orders",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async saveOrder(orderId:string,customerId:string,customerName:string,customerEmail:string,customerPhone:number,customerAddress:string,order_amount:number,
    products:Array<any>): Promise<ServiceResponse<null>> {
    try {
      await this.orderRepository.saveOrder(orderId,
        customerId,
        customerName,
        customerEmail,
        customerPhone,
        customerAddress,
        order_amount,
        products,);
      return ServiceResponse.success<null>("Order saved successfully", null);
    } catch (e) {
      const errorMessage = `Error occurred while saving order: ${e}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while saving the order",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

/*   async fetchCashfreeOrder(orderId: string): Promise<ServiceResponse<any>> {
    try {
      Cashfree.XClientId = "TEST430329ae80e0f32e41a393d78b923034";
      Cashfree.XClientSecret = "TESTaf195616268bd6202eeb3bf8dc458956e7192a85";
      Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;
      
      Cashfree.PGOrderFetchPayments("2023-08-01", "order_1733212830791").then((response) => {
          console.log('Order fetched successfully:', response.data);
      }).catch((error) => {
          console.error('Error:', error.response.data.message);
      });
      console.log("Response",response);
      return ServiceResponse.success<any>("Cashfree order fetched successfully", response);
    } catch (error) {
      const errorMessage = `Error occurred while fetching Cashfree order: ${error}`;
      logger.error(errorMessage);

      return ServiceResponse.failure(
        "An error occurred while fetching the Cashfree order",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  } */
}

export const orderService = new OrderService();
