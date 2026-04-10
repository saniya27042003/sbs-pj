import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vargani } from './vargani.entity';

@Injectable()
export class VarganiService {
  constructor(
    @InjectRepository(Vargani)
    private varganiRepository: Repository<Vargani>,
  ) {}

  findAll(): Promise<Vargani[]> {
    return this.varganiRepository.find();
  }

  async count(): Promise<number> {
    return this.varganiRepository.count();
  }

  async create(varganiData: Partial<Vargani>): Promise<Vargani> {
    const vargani = this.varganiRepository.create(varganiData);
    return this.varganiRepository.save(vargani);
  }
}
