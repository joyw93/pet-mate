import { Controller, Get, Req, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(@Request() req) {
    console.log(req.session);
    console.log(req.user);
  }
}
