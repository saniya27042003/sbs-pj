import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SabhasadModule } from './sabhasad/sabhasad.module';
import { VarganiModule } from './vargani/vargani.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Pd@65464541', 
      database: 'test',
      autoLoadEntities: true,
      synchronize: true, 
    }),
    SabhasadModule,
    VarganiModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
