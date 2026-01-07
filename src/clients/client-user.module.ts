import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientUserRepository } from "./client-user.repository";
import { ClientUserService } from "./client-user.service";
import { ClientUserController } from "./client-user.controller";
import { ClientSessionRepository } from "./client-session.repository";
@Module({
    imports: [TypeOrmModule.forFeature([ClientUserRepository,ClientSessionRepository])],
    controllers: [ClientUserController],
    providers: [ClientUserService],
    exports: [ClientUserService]
})
export class ClientUserModule {

}