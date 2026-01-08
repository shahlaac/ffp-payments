import { Injectable, NotFoundException } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Order } from "src/models/order.entity";
import { OrderRepository } from "./order.repository";

@Injectable()
export class OrderService extends TypeOrmCrudService<Order> {
    constructor( private orderRepository : OrderRepository){
        super(orderRepository)
    }
    
    async createOrder(order: Order):Promise<Order> {
        return await this.orderRepository.save(order);
    }
    async getOrderById(id:number):Promise<Order> {
        return await this.orderRepository.findOne({where: {id}})
 
    }
    async updateOrder(orderId:number,updateOrder : Order) :Promise<Order>{
        const orderFound = await this.orderRepository.findOne(orderId)
        if (orderFound == null) {
            throw new NotFoundException(`order not found`);
        }
        updateOrder = this.orderRepository.merge(orderFound,updateOrder)

        return  this.orderRepository.save(updateOrder)
    }
    async deleteOrder(id:number,order:Order):Promise<any> {
        const orderFound = await this.orderRepository.findOne(id);
        if(orderFound == null) {
            throw new NotFoundException(`Order not Found`);
        }
        order = this.orderRepository.merge(orderFound,order)
        return this.orderRepository.save(order);
    }
}