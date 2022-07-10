import { Injectable } from '@nestjs/common';

@Injectable()
export class ServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
