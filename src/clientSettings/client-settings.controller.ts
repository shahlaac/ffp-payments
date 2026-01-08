import { Body, Controller } from "@nestjs/common";
import { ClientSettingsService } from "./client-settings.service";
import { ClientSettingsRepository } from "./client-settings.repository";
import { GrpcMethod } from "@nestjs/microservices";
import { ClientSettings } from "../models/client-user-setting.entity";
import { SearchClientSettingBy } from "../models/seach-client-settings";
import { Between, In, Like } from "typeorm";

@Controller('client-settings')
export class ClientSettingsController {
    constructor(
        private clientSettingsService: ClientSettingsService,
        private clientSettingsRepository: ClientSettingsRepository
    ) { }
    @GrpcMethod('ClientSettingsService', 'getAllClientSettings')
    async getAllClientSettings(): Promise<any> {
        const result = await this.clientSettingsService.find();
        const response = { clientsettings: result }
        return response;

    }
    @GrpcMethod('ClientSettingsService', 'createClientSettings')
    async createClientSettings(@Body() clientSetting: ClientSettings): Promise<ClientSettings> {
        const savedClientSettings = await this.clientSettingsService.createClientSettings(clientSetting)
        return this.clientSettingsService.findOne(savedClientSettings.id)
    }
    @GrpcMethod('ClientSettingsService', 'getClientSettingsById')
    async getClientSettingById(clientSetting: { id: number }): Promise<ClientSettings> {
        const result = await this.clientSettingsService.getClientSettingsById(clientSetting.id)
        return result;
    }
    @GrpcMethod('ClientSettingsService', 'updateClientSettings')
    async updateClientSettings(@Body() clientSetting: ClientSettings): Promise<ClientSettings> {
        return await this.clientSettingsService.updateClientSettings(clientSetting.id, clientSetting)
    }
    @GrpcMethod('ClientSettingsService', 'deleteClientSettings')
    async deleteClientSettings(@Body() clientSetting: ClientSettings): Promise<any> {
        return await this.clientSettingsService.deleteClientSettings(clientSetting.id, clientSetting)
    }
    @GrpcMethod('ClientSettingsService', 'searchClientSettings')
    async searchClientSettings(@Body() searchClientSettingBy: SearchClientSettingBy): Promise<any> {
        let where: any = {};
        where = Object.assign(where, searchClientSettingBy)
        console.log(where);
        console.log("searchClientSettingsBy", searchClientSettingBy);

        if (searchClientSettingBy.status >= 0) {
            where['status'] = searchClientSettingBy.status.toString()
        }
        if (searchClientSettingBy.names) {
            where['name'] = In(searchClientSettingBy.names);
            delete where.names
        }
        if (searchClientSettingBy.nameLike) {
            where['name'] = Like('%' + searchClientSettingBy.nameLike + '%');
            delete where.nameLike;
        }
        let result = await this.clientSettingsService.find({ where : where})
                if(searchClientSettingBy.startDate && searchClientSettingBy.endDate){
                    result = await this.clientSettingsService.find({  createdDate: Between(searchClientSettingBy.startDate, searchClientSettingBy.endDate)})
                }
                // const response =
                return  {clientsettings:result};

    }




}