import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

/**
 * Module encapsulates the logic related to BL entity.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Task])], // Define registered repositories for this scope (task module)
  providers: [TasksService],
  controllers: [TasksController],
exports: [TasksService]
})
export class TasksModule {}
