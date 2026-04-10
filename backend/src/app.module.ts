import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SabhasadModule } from './sabhasad/sabhasad.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Pd@65464541', // Change this to your actual password
      database: 'test',
      autoLoadEntities: true,
      synchronize: true, // Set to false in production
    }),
    SabhasadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
