import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { join } from 'path';
import { QueryFailedExceptionFilter } from './utilities/exception-filters/query-failed.exception-filter';
import { RequestLoggingInterceptor } from './utilities/interceptors/request-logging.interceptor';
import { NotFoundExceptionFilter } from './utilities/exception-filters/not-found.exception-filter';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: `localhost:5001`,
      package: 'clients',
      protoPath: join(__dirname, '../src/protos/clients.proto'),
      maxSendMessageLength: 1024 * 1024 * 50, // Set the maximum message size to 50MB
      maxReceiveMessageLength: 1024 * 1024 * 50, // Set the maximum message size to 50MB
    }
  });
  app.useGlobalFilters(new QueryFailedExceptionFilter());
  app.useGlobalFilters(new NotFoundExceptionFilter());
  app.useGlobalInterceptors(new RequestLoggingInterceptor());
  app.listen(() => {
    console.log(`ffp-clients is running`);
  });
}
bootstrap();
