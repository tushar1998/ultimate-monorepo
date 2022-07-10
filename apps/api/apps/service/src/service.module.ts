import { Module } from '@nestjs/common';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';

@Module({
  imports: [],
  controllers: [ServiceController],
  providers: [ServiceService],
})
export class ServiceModule {}
