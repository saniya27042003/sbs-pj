import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sabhasad } from './sabhasad.entity';
import { SabhasadService } from './sabhasad.service';
import { SabhasadController } from './sabhasad.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Sabhasad])],
  providers: [SabhasadService],
  controllers: [SabhasadController],
})
export class SabhasadModule {}