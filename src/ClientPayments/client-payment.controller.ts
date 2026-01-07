import { Body, Controller } from "@nestjs/common";
import { ClientPaymentService } from "./client-payment.service";
import { ClientPaymentRepository } from "./client-payment.repository";
import { GrpcMethod } from "@nestjs/microservices";
import { ClientPayment } from "../models/client-payment.entity";

@Controller('client-payment')
export class ClientPaymentController {
    constructor(
            private clientPaymentServive:ClientPaymentService,
            private clientPaymentRepository: ClientPaymentRepository,
        ) {}

        @GrpcMethod('ClientPaymentService', 'getAllClientPayments')
        async getAllClientPayments(): Promise<any> {
            const result = await this.clientPaymentServive.find();
            const response = {clientpayments:result}
            return response;
        }
        @GrpcMethod('ClientPaymentService', 'createClientPayment')
        async createSetting(@Body() clientPayment: ClientPayment): Promise<ClientPayment> {
            return await this.clientPaymentServive.createClientPayment(clientPayment);
        }

        @GrpcMethod('ClientPaymentService', 'updateClientPayment')
        async updateClientPayment(@Body() clientPayment: ClientPayment): Promise<ClientPayment> {
            return await this.clientPaymentServive.updateClientPayment(clientPayment.id,clientPayment);
        }
        @GrpcMethod('ClientPaymentService','getClientPaymentById')
        async getClientPaymentById(clientPayment : {id:number}):Promise<ClientPayment>{
            const result = await this.clientPaymentServive.getClientPaymentById(clientPayment.id)
            return result;
        }
        
    
}