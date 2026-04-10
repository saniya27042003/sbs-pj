import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sabhasad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  middleName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ nullable: true })
  fullName?: string;

  @Column()
  contactNo: string;

  @Column()
  address: string;

  @Column()
  date: Date;

  @Column({ nullable: true })
  mailId?: string;
}