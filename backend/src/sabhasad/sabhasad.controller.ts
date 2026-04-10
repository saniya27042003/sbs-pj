import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { SabhasadService } from './sabhasad.service';
import { Sabhasad } from './sabhasad.entity';

@Controller('sabhasad')
export class SabhasadController {
  constructor(private readonly sabhasadService: SabhasadService) {}

  @Post()
  create(@Body() sabhasadData: Partial<Sabhasad>) {
    return this.sabhasadService.create(sabhasadData);
  }

  @Get()
  findAll() {
    return this.sabhasadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sabhasadService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() sabhasadData: Partial<Sabhasad>) {
    return this.sabhasadService.update(+id, sabhasadData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sabhasadService.remove(+id);
  }
}