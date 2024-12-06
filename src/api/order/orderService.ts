import { StatusCodes } from "http-status-codes";
import { OrderRepository } from "@/api/order/orderRepository";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";
import { Order, OrderWithProducts,OrderAddSchema } from "./orderModel";
import { Cashfree } from "cashfree-pg"; 


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

  async saveOrder(orderId:string,customerId:string,customerName:string,customerEmail:string,customerPhone:number,customerAddress:string,
    customerState:string,
      customerCity:string,
      customerCountry:string,order_amount:number,
    products:Array<any>): Promise<ServiceResponse<null>> {
    try {
      await this.orderRepository.saveOrder(orderId,customerId,customerName,customerEmail,customerPhone,customerAddress,customerState,
        customerCity,
        customerCountry,
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

  async fetchCashfreeOrder(orderId: string): Promise<ServiceResponse<any>> {
    try {
      const response = await fetch(
        `https://sandbox.cashfree.com/pg/orders/${orderId}`,
        {
          headers: {
            "x-client-id": `${process.env.CASHFREE_APP_ID}`,
            "x-client-secret":`${process.env.CASHFREE_APP_ID}`,
            Accept: "application/json",
            "x-api-version": "2023-08-01",
          },
        }
      );
    
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Parsed response data:", data);
  
      return ServiceResponse.success<any>("Cashfree order fetched successfully", data);
    } catch (error) {
      console.error("Error fetching order:", error);
      return ServiceResponse.failure(
        "An error occurred while fetching the Cashfree order",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getDiscount(coupon : string):Promise<ServiceResponse<any>>{
    try {
      const response = await this.orderRepository.getDiscount(coupon);
      return ServiceResponse.success<OrderWithProducts[]>("Your discount percentage-", response);
    } catch (e) {
      const errorMessage = `Error occurred while fetching discount,: ${e}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while fetching discount",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
  
}

export const orderService = new OrderService();
