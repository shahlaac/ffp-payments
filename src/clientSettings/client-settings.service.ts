import { Injectable, NotFoundException } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { ClientSettings } from "src/models/client-user-setting.entity";
import { ClientSettingsRepository } from "./client-settings.repository";

@Injectable()
export class ClientSettingsService extends TypeOrmCrudService<ClientSettings> {
    constructor(
        private clientSettingsRepository: ClientSettingsRepository,
    ) {
        super(clientSettingsRepository);


    }
    async createClientSettings(clientSettings: ClientSettings): Promise<ClientSettings> {
        return await this.clientSettingsRepository.save(clientSettings);
    }
    async getClientSettingsById(id: number): Promise<ClientSettings> {
        return await this.clientSettingsRepository.findOne({ where: { id } })

    }
    async updateClientSettings(setId: number, clientSettings: ClientSettings): Promise<ClientSettings> {
        const clientSettingFound = await this.clientSettingsRepository.findOne(setId);
        if (clientSettingFound == null) {
            throw new NotFoundException(`Setting not found`);
        }
        clientSettings = this.clientSettingsRepository.merge(clientSettingFound, clientSettings);
        return this.clientSettingsRepository.save(clientSettings);

    }
    async deleteClientSettings(id:number,clientSetting:ClientSettings):Promise<any>{
        const settingsFound = await this.clientSettingsRepository.findOne(id);
        if(settingsFound == null){
            throw new NotFoundException(`setting not found`)
        }
        clientSetting = this.clientSettingsRepository.merge(settingsFound,clientSetting);
        return this.clientSettingsRepository.save(clientSetting)


    }




}
