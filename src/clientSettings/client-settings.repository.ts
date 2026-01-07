import { ClientSettings } from "../models/client-user-setting.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(ClientSettings)
export class ClientSettingsRepository extends Repository<ClientSettings> {
    
}