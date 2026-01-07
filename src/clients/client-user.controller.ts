import { Controller, Body } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { ClientUserRepository } from "./client-user.repository";
import { ClientUserService } from "./client-user.service";
import { ClientUser } from '../models/client-user.entity';
import { ClientSession } from "../models/client-session.entity";

@Controller('clients')
export class ClientUserController {
    constructor(
        private clientUserService:ClientUserService,
        private clientUserRepository: ClientUserRepository,
    ) {} 

    @GrpcMethod('ClientUserService', 'getAllClients')
    async getAllClients(): Promise<any> {
        const result = await this.clientUserService.find();
        const response = {clients:result}
        return response;
    }

    @GrpcMethod('ClientUserService', 'createClient')
    async createClient(@Body() clientUser: ClientUser): Promise<ClientUser> {
        const savedClientUser = await this.clientUserService.createClientUser(clientUser);
        return this.clientUserService.findOne(savedClientUser.id)
    }

    //for clientsession
    @GrpcMethod('ClientSessionService','createClientSession')
    async createClientSession(clientSession : ClientSession):Promise<ClientSession> {
        const savedClientSession = await this.clientUserService.createClientSession(clientSession);
        return  savedClientSession;
    }
    @GrpcMethod('ClientSessionService','getClientSessionById')
    async getClientSessionById(clientSession : {id:number}){
        const result = await this.clientUserService.getClientSessionById(clientSession.id)
       
        return result;

    }

    
}    