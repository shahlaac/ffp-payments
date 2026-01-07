import { Controller, Body } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { SettingRepository } from './setting.repository';
import { SettingService } from "./setting.service";
import { Setting } from "../models/setting.entity";
import { SearchSettingBy } from "../models/search-setting";
import {Between, Raw, Like, In } from "typeorm";

@Controller('settings')
export class SettingController {
    constructor(
        private settingService:SettingService,
        private settingRepository: SettingRepository,
    ) {}

    @GrpcMethod('SettingService', 'getAll')
    async getAll(): Promise<any> {
        const result = await this.settingService.find();
        const response = {settings:result}
        return response;
    }

    @GrpcMethod('SettingService', 'createSetting')
    async createSetting(@Body() setting: Setting): Promise<Setting> {
        return await this.settingService.createSetting(setting);
    }

    @GrpcMethod('SettingService', 'updateSetting')
    async updateSetting(@Body() updateSetting: Setting): Promise<Setting> {
        return await this.settingService.updateSetting(updateSetting.id,updateSetting);
    }

    @GrpcMethod('SettingService', 'deleteSetting')
    async deleteSetting(@Body()setting: Setting): Promise<any> {
        return await this.settingService.deleteSetting(setting.id,setting); 
    }

    @GrpcMethod('SettingService', 'searchSetting')
    async searchSetting(@Body() searchSettingBy:SearchSettingBy) : Promise<any> {
        let where:any ={};
        where = Object.assign(where, searchSettingBy)
        delete where.skip;
        delete where.take;
        console.log(where);
        console.log("searchSettingBy",searchSettingBy)
        if(searchSettingBy.status >= 0){
            where['status'] = searchSettingBy.status.toString()
        }
        if(searchSettingBy.names){
            where['name'] = In(searchSettingBy.names);
            delete where.names;
        }
        if(searchSettingBy.nameLike){
            where['name'] = Like('%'+searchSettingBy.nameLike+'%');
            delete where.nameLike;
        }
        if(searchSettingBy.appCodesIn){
            where['appCode'] = In(searchSettingBy.appCodesIn);
            delete where.appCodesIn;
        }
        // if(searchSettingBy.appCode){
        //     where['appCode'] = searchSettingBy.appCode;
        // }
        let result = await this.settingService.find({ where : where})
        if(searchSettingBy.startDate && searchSettingBy.endDate){
            result = await this.settingService.find({  createdDate: Between(searchSettingBy.startDate, searchSettingBy.endDate)})
        }
        const response = {settings:result}
        return response;
    }

    @GrpcMethod('SettingService', 'getSettingReport')
    async getSettingReport(@Body() searchSettingBy:SearchSettingBy) : Promise<any> {
        const where:any ={};
        if(searchSettingBy.appCode){
            where['appCode'] = searchSettingBy.appCode
        }
        if(searchSettingBy.displayName){
            where['displayName'] = searchSettingBy.displayName
        }
        if(searchSettingBy.displayName){
            where['displayName'] =  Like("%"+searchSettingBy.displayName+"%")
        }
        if(searchSettingBy.name){
            where['name'] = Like("%"+searchSettingBy.name+"%")
        }
        if(searchSettingBy.data){
            where['data'] = Like("%"+searchSettingBy.data+"%")
        }
        if(searchSettingBy.id){
            where['id'] = searchSettingBy.id
        }
        if(searchSettingBy.status || searchSettingBy.status == 0){
            where['status'] = searchSettingBy.status.toString();
        }
        if(searchSettingBy.startDate && searchSettingBy.endDate){
            const start_date = searchSettingBy.startDate +' '+ "00:00:00"
            const end_date = searchSettingBy.endDate +' '+ "23:59:59"
            where['createdDate'] = Raw (alias => ` ${alias} between ${'"'+start_date+'"'} and ${'"'+end_date+'"'} `)
         }
        const [result, total, ] = await this.settingRepository.findAndCount({
            where : where,relations:['createdByUser','updatedByUser'],
            take:searchSettingBy.take,
            skip:searchSettingBy.skip,
            order:{ createdDate:"DESC"}
            });

        return {
        data: {settings:result},
        total: total,
        count: result.length,
        }
    }
}