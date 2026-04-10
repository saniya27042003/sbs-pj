import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Unique } from 'typeorm';

@Entity()
@Unique(['username'])
export class AuthUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  username: string;

  @Column({ length: 128 })
  passwordHash: string;

  @CreateDateColumn()
  createdAt: Date;
}
