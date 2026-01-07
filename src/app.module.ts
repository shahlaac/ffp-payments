import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientUserModule } from './clients/client-user.module';
import { ConfigModule } from '@nestjs/config';
import applicationConfig from './config/application.config';
import { SettingModule } from './setting/setting.module';
import { OrderModule } from './Orders/orders.module';
import { ClientSettingModule } from './clientSettings/client-settings.module';
import { ClientPaymentModule } from './ClientPayments/client-payments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [applicationConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(),
    ClientUserModule,
    SettingModule,
    OrderModule,
    ClientSettingModule,
    ClientPaymentModule
  ],
  controllers: [AppController],
  // providers: [ {
  //   provide: APP_PIPE,
  //   useClass: ValidationPipe,
  // }],
})
export class AppModule {}
