import { Repository, EntityRepository } from "typeorm";
import { ClientUser } from '../models/client-user.entity';

@EntityRepository(ClientUser)
export class ClientUserRepository extends Repository<ClientUser> {
   
}