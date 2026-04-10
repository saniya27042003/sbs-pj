import { Controller, Get, Post, Body } from '@nestjs/common';
import { VarganiService } from './vargani.service';
import { Vargani } from './vargani.entity';

@Controller('vargani')
export class VarganiController {
  constructor(private readonly varganiService: VarganiService) {}

  @Get()
  findAll() {
    return this.varganiService.findAll();
  }

  @Get('count')
  count() {
    return this.varganiService.count();
  }

  @Post()
  create(@Body() varganiData: Partial<Vargani>) {
    return this.varganiService.create(varganiData);
  }
}
