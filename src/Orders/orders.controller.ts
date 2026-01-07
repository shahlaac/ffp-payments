import { Body, Controller } from "@nestjs/common";
import { OrderService } from "./order.service";
import { GrpcMethod } from "@nestjs/microservices";
import { Order } from "../models/order.entity";

@Controller('orders')
export class OrderController {
    constructor (
        private orderService : OrderService
        
    ){}
    @GrpcMethod('OrderService','getAllOrders')
    async getAllOrders():Promise<any> {
        const result = await this.orderService.find();
        const response = {orders:result}
        return response;
    }
    @GrpcMethod('OrderService','createOrder')
    async createOrder( order : Order):Promise<Order>{
        const savedOrder = await this.orderService.createOrder(order)
        return this.orderService.findOne(savedOrder.id)
    }
    @GrpcMethod('OrderService','getOrderById')
    async getOrderById(order : {id:number}):Promise<Order>{
        const result = await this.orderService.getOrderById(order.id)
        return result;
    }
    @GrpcMethod('OrderService','updateOrder')
    async updateOrder(order : Order):Promise<Order>{
        return await this.orderService.updateOrder(order.id,order)
    }
} 