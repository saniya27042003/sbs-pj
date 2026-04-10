import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthUser } from './auth.entity';
import { createHash } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthUser)
    private authRepository: Repository<AuthUser>,
  ) {}

  private hashPassword(password: string): string {
    return createHash('sha256').update(password).digest('hex');
  }

  async signup(data: { username: string; password: string }) {
    const { username, password } = data;
    if (!username || !password) {
      throw new BadRequestException('Username and password are required');
    }

    const existing = await this.authRepository.findOneBy({ username });
    if (existing) {
      throw new BadRequestException('Username already exists');
    }

    const user = this.authRepository.create({
      username,
      passwordHash: this.hashPassword(password),
    });
    const saved = await this.authRepository.save(user);
    return { id: saved.id, username: saved.username };
  }

  async login(data: { username: string; password: string }) {
    const { username, password } = data;
    if (!username || !password) {
      throw new BadRequestException('Username and password are required');
    }

    const user = await this.authRepository.findOneBy({ username });
    if (!user || user.passwordHash !== this.hashPassword(password)) {
      throw new UnauthorizedException('Invalid username or password');
    }

    return { id: user.id, username: user.username };
  }
}
