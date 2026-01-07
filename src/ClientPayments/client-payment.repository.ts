import { ClientPayment } from "../models/client-payment.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(ClientPayment)
export class ClientPaymentRepository extends Repository<ClientPayment> {
    
}