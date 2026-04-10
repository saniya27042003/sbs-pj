import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Vargani {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sabhasadId: number;

  @Column()
  tranDate: Date;

  @Column()
  tranNo: number;

  @Column()
  varganiType: string;
}
