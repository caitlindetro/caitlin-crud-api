import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { List } from './list/list.entity';
import { Task } from './task/task.entity';
import { User } from './user/user.entity';
import { UsersModule } from './user/users.module';
import { ListsModule } from './list/lists.module';
import { TasksModule } from './task/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number.parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: 'caitlin_crud_api',
      entities: [List, Task, User],
      synchronize: true,
    }),
    UsersModule,
    ListsModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
