import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientSettingsRepository } from "./client-settings.repository";
import { ClientSettingsController } from "./client-settings.controller";
import { ClientSettingsService } from "./client-settings.service";

@Module({
    imports:[TypeOrmModule.forFeature([ClientSettingsRepository])],
    controllers: [ClientSettingsController],
    providers:[ClientSettingsService],
    exports: [ClientSettingsService]
 })
 export class ClientSettingModule {

 }