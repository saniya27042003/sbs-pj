import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sabhasad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  contactNo: string;

  @Column()
  address: string;

  @Column()
  date: Date;

  @Column({ nullable: true })
  mailId?: string;
}