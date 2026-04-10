import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { SabhasadService } from './sabhasad.service';
import { Sabhasad } from './sabhasad.entity';

@Controller('sabhasad')
export class SabhasadController {
  constructor(private readonly sabhasadService: SabhasadService) {}

  @Post()
  create(@Body() sabhasadData: Partial<Sabhasad>) {
    sabhasadData.fullName = [sabhasadData.firstName, sabhasadData.middleName, sabhasadData.lastName]
      .filter(Boolean)
      .join(' ');
    return this.sabhasadService.create(sabhasadData);
  }

  @Get()
  async findAll() {
    const data = await this.sabhasadService.findAll();
    return data.map((item) => ({
      ...item,
      fullName: item.fullName || [item.firstName, item.middleName, item.lastName].filter(Boolean).join(' '),
    }));
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