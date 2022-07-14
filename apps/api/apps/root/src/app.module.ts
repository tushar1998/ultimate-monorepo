import { Module } from '@nestjs/common';
import { AppController } from './rest/app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import RootConfiguration from '../../../config/configuration';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [RootConfiguration],
      isGlobal: true,
      envFilePath: join(__dirname, '..', '..', '..', '.env'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
