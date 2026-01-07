import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientPaymentRepository } from "./client-payment.repository";
import { ClientPaymentController } from "./client-payment.controller";
import { ClientPaymentService } from "./client-payment.service";

@Module({
     imports: [TypeOrmModule.forFeature([ClientPaymentRepository])],
        controllers: [ClientPaymentController],
        providers: [ClientPaymentService],
        exports: [ClientPaymentService]
})
export class ClientPaymentModule {

}