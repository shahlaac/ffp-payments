import { Injectable, NotFoundException } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { SettingRepository } from "./setting.repository";
import { Setting } from "../models/setting.entity";

@Injectable()
export class SettingService extends TypeOrmCrudService<Setting> {

    constructor(private settingRepository: SettingRepository) {
        super(settingRepository);
    }

    async createSetting(setting: Setting): Promise<Setting> {
        const final = await this.settingRepository.save(setting);
        return final;
    }

    async updateSetting(faqId: number, updateSetting: Setting): Promise<Setting> {
        const settingFound = await this.settingRepository.findOne(faqId);
        if (settingFound == null) {
            throw new NotFoundException(`Setting not found`);
        }
        updateSetting = this.settingRepository.merge(settingFound, updateSetting);
        return this.settingRepository.save(updateSetting);
    }

    async deleteSetting(id: number, setting: Setting): Promise<any> {
        const settingFound = await this.settingRepository.findOne(id);
        if (settingFound == null) {
            throw new NotFoundException(`Setting not found`);
        }
        setting = this.settingRepository.merge(settingFound, setting);
        return this.settingRepository.save(setting);
    }
}