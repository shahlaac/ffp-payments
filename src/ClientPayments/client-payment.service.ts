import { Injectable, NotFoundException } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { ClientPayment } from "../models/client-payment.entity";
import { ClientPaymentRepository } from "./client-payment.repository";

@Injectable()
export class ClientPaymentService extends TypeOrmCrudService<ClientPayment> {
    constructor(private clientPaymentRepository :ClientPaymentRepository){
        super(clientPaymentRepository);
    }
    async createClientPayment(clientPayment: ClientPayment): Promise<ClientPayment> {
            const result = await this.clientPaymentRepository.save(clientPayment);
            return result;
    }
    async getClientPaymentById(id:number):Promise<ClientPayment> {
            return await this.clientPaymentRepository.findOne({where: {id}})
    
        }
    async updateClientPayment(payId: number, clientPayment: ClientPayment): Promise<ClientPayment> {
        const paymentFound = await this.clientPaymentRepository.findOne(payId);
        if (paymentFound == null) {
             throw new NotFoundException(`Payments not found`);
        }
        clientPayment = this.clientPaymentRepository.merge(paymentFound,clientPayment);
        return this.clientPaymentRepository.save(clientPayment);
    }

}