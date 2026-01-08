import { Body, Controller } from "@nestjs/common";
import { OrderService } from "./order.service";
import { GrpcMethod } from "@nestjs/microservices";
import { Order } from "../models/order.entity";
import { searchOrderBy } from "../models/order-search";
import { Between, Like } from "typeorm";

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
    async createOrder(@Body() order : Order):Promise<Order>{
        const savedOrder = await this.orderService.createOrder(order)
        return this.orderService.findOne(savedOrder.id)
    }
    @GrpcMethod('OrderService','getOrderById')
    async getOrderById(order : {id:number}):Promise<Order>{
        const result = await this.orderService.getOrderById(order.id)
        return result;
    }
    @GrpcMethod('OrderService','updateOrder')
    async updateOrder(@Body() order : Order):Promise<Order>{
        return await this.orderService.updateOrder(order.id,order)
    }
    @GrpcMethod('OrderService','deleteOrder')
    async deleteOrder(@Body() order:Order):Promise<any> {
        return await this.orderService.deleteOrder(order.id,order);
    }
    @GrpcMethod('OrderService','searchOrder')
    async searchOrder(@Body() searchOrderBy:searchOrderBy):Promise<any>{
        let where :any = {};
        where = Object.assign(where,searchOrderBy)
        console.log(where);
        console.log("searchOrderBy", searchOrderBy);
        
        
        

        if (searchOrderBy.id) {
            where['id'] = searchOrderBy.id;
        }
        if(searchOrderBy.orderNumber) {
            where['orderNumber'] = searchOrderBy.orderNumber;
        }

        if(searchOrderBy.name){
            where['name'] = searchOrderBy.name;
        }
        if(searchOrderBy.orderNameLike){
            where['orderNameLike'] = Like('%' + searchOrderBy.orderNameLike + '%');
            delete where.orderNameLike;
        }
        let result = await this.orderService.find({where : where});

        if(searchOrderBy.startDate && searchOrderBy.endDate){
            result = await this.orderService.find({createdDate: Between(searchOrderBy.startDate , searchOrderBy.endDate)})
        }
        const response = {orders : result}
        return response


    }

} 