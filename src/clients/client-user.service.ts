import { Injectable, NotFoundException } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { ClientUserRepository } from "./client-user.repository";
import { ClientUser } from "src/models/client-user.entity";
import { ClientSessionRepository } from "./client-session.repository";
import { ClientSession } from "src/models/client-session.entity";

@Injectable()
export class ClientUserService extends TypeOrmCrudService<ClientUser> {

    constructor(
        private clientUserRepository: ClientUserRepository,
        private clientSessionRepository : ClientSessionRepository

    ) {
        super(clientUserRepository);
    }
    async createClientUser(clientUser: ClientUser): Promise<ClientUser> {
        return await this.clientUserRepository.save(clientUser);
    }

    //for client sessions
    async createClientSession(session:ClientSession) : Promise<ClientSession> {
        return await this.clientSessionRepository.save(session);
    }
    async getClientSessionById(id:number) : Promise<ClientSession>{
        return await  this.clientSessionRepository.findOne({ where: { id } })
    }

    
}