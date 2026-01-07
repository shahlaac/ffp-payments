import {ClientSession} from '../models/client-session.entity' 
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(ClientSession)
export class ClientSessionRepository extends Repository<ClientSession>{

}
