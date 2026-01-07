import { Controller } from "@nestjs/common";
import { ClientSettingsService } from "./client-settings.service";
import { ClientSettingsRepository } from "./client-settings.repository";
import { GrpcMethod } from "@nestjs/microservices";
import { ClientSettings } from "../models/client-user-setting.entity";

@Controller('client-settings')
export class ClientSettingsController {
    constructor (
        private clientSettingsService :ClientSettingsService,
        private clientSettingsRepository : ClientSettingsRepository
    ){}
    @GrpcMethod('ClientSettingsService','getAllClientSettings')
    async getAllClientSettings():Promise<any>{
        const result = await this.clientSettingsService.find();
        const response = {clientsettings:result}
        return response;
        
    }
    @GrpcMethod('ClientSettingsService','createClientSettings')
    async createClientSettings(clientSetting:ClientSettings):Promise<ClientSettings> {
        const savedClientSettings = await this.clientSettingsService.createClientSettings(clientSetting)
        return this.clientSettingsService.findOne(savedClientSettings.id)
    }
    @GrpcMethod('ClientSettingsService','getClientSettingsById')
    async getClientSettingById(clientSetting : {id:number}):Promise<ClientSettings>{
        const result = await this.clientSettingsService.getClientSettingsById(clientSetting.id)
        return result;
    }
     @GrpcMethod('ClientSettingsService','updateClientSettings')
    async updateClientSettings(clientSetting : ClientSettings):Promise<ClientSettings>{
        return await this.clientSettingsService.updateClientSettings(clientSetting.id,clientSetting)
    }
        



}