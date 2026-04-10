import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Vargani {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sabhasadId: number;

  @Column({ nullable: true })
  fullName?: string;

  @Column()
  tranDate: Date;

  @Column()
  tranNo: number;

  @Column()
  varganiType: string;

  @Column({ nullable: true })
  months?: number;

  @Column('decimal', { precision: 12, scale: 2, nullable: true })
  amount?: number;
}
