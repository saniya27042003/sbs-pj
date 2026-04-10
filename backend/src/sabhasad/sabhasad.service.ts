import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sabhasad } from './sabhasad.entity';

@Injectable()
export class SabhasadService {
  constructor(
    @InjectRepository(Sabhasad)
    private sabhasadRepository: Repository<Sabhasad>,
  ) {}

  findAll(): Promise<Sabhasad[]> {
    return this.sabhasadRepository.find();
  }

  findOne(id: number): Promise<Sabhasad | null> {
    return this.sabhasadRepository.findOneBy({ id });
  }

  async create(sabhasadData: Partial<Sabhasad>): Promise<Sabhasad> {
    const sabhasad = this.sabhasadRepository.create(sabhasadData);
    return this.sabhasadRepository.save(sabhasad);
  }

  async update(id: number, sabhasadData: Partial<Sabhasad>): Promise<Sabhasad | null> {
    await this.sabhasadRepository.update(id, sabhasadData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.sabhasadRepository.delete(id);
  }
}