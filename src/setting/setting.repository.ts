import { Repository, EntityRepository } from "typeorm";
import { Setting } from "../models/setting.entity";

@EntityRepository(Setting)
export class SettingRepository extends Repository<Setting> {
   
}