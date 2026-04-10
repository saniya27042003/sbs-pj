import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vargani } from './vargani.entity';
import { VarganiService } from './vargani.service';
import { VarganiController } from './vargani.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Vargani])],
  providers: [VarganiService],
  controllers: [VarganiController],
})
export class VarganiModule {}
