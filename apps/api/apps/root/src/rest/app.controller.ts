import { Controller, Get } from '@nestjs/common';
import { ApiOAuth2, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from '../app.service';

@ApiOAuth2(['profile', 'email', 'openid'])
@ApiTags('Post')
@Controller('post')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Root API',
    schema: { type: 'string' },
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
