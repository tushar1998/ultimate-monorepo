import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const logger = new Logger('Root');

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  const httpPort: string = configService.get('http_port');
  app.enableCors();

  // Swagger Documentation
  const document = new DocumentBuilder()
    .setTitle('Ultimate Monorepo Root API')
    .setDescription('Root Microservice to manage requests from admin and web apps')
    .setVersion('1.0')
    .addOAuth2({
      type: 'openIdConnect',
      description: "The 'oauth2' scheme is used to secure the API with OAuth2 authentication.",
      openIdConnectUrl: 'https://dev-whc6jxun.us.auth0.com/.well-known/openid-configuration',
      in: 'header',
      scheme: 'Authorization',
      bearerFormat: 'Bearer',
    })
    .build();

  const swagger = SwaggerModule.createDocument(app, document);
  SwaggerModule.setup('swagger', app, swagger);

  await app.listen(httpPort, () => {
    logger.debug(`API Server is listenting on port ${httpPort}`);
  });
}
bootstrap();
