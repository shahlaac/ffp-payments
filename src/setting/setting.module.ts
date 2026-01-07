import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SettingRepository } from "./setting.repository";
import { SettingService } from "./setting.service";
import { SettingController } from "./setting.controller";

@Module({
    imports: [TypeOrmModule.forFeature([SettingRepository])],
    controllers: [SettingController],
    providers: [SettingService],
    exports: [SettingService]
})
export class SettingModule {

}