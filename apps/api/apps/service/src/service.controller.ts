import { Controller, Get } from '@nestjs/common';
import { ServiceService } from './service.service';

@Controller()
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get()
  getHello(): string {
    return this.serviceService.getHello();
  }
}
