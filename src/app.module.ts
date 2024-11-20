import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskModule } from './task/task.module';
import { Task } from "./task/entities/task.entity";
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: 'to_do_list',
      entities: [Task],
      synchronize: true
    }),
    TypeOrmModule.forFeature([Task]),
    TaskModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
