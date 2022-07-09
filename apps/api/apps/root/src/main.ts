import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  const httpPort: string = configService.get('HTTP_PORT');
  app.enableCors();
  await app.listen(httpPort, () => {
    console.log(`API Server is listenting on port ${httpPort}`);
  });
}
bootstrap();
