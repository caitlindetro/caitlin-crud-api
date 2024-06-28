import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  ValidationPipe
} from '@nestjs/common';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

/**
 * The purpose of the controller is to handle incoming HTTP requests, validate
 * parameters and pass validated data to the service class to execute business
 * logic requirements.
 */
@Controller('tasks')
export class TasksController {
  constructor (
    private readonly tasksService: TasksService // Dependency Injection
  ) {}

  @Get()
  async getAllTasks(): Promise<Task[]> {
    return await this.tasksService.getAllTasks();
  }

  @Get(':id')
  async getTask(@Param('id') id: number): Promise<Task | string> {
    const task = await this.tasksService.getTask(id);
    if (!task) { throw new HttpException('Task not found', HttpStatus.NOT_FOUND) }
    return task;
  }

  @Get('filter/:listId')
  async getTasksByList(@Param('listId') listId: number): Promise<Task[] | string> {
    return await this.tasksService.getTasksByList(listId);
  }

  @Post()
  async createTask(
    // Validation pipe will validate the request according to the rules in the DTO
    @Body(ValidationPipe) createTaskDto: CreateTaskDto
  ): Promise<Task | string> {
    const newTask = await this.tasksService.createTask(createTaskDto);
    if (!newTask) { throw new HttpException('Failed to create task', HttpStatus.UNPROCESSABLE_ENTITY) }
    return newTask;
  }

  @Patch(':id')
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateTaskDto: UpdateTaskDto // Note the validation pipe and task DTO
  ): Promise<Task | string> {
    const updatedTask = await this.tasksService.updateTask(id, updateTaskDto);
    if (!updatedTask) { throw new HttpException('Task not found', HttpStatus.NOT_FOUND) }
    return updatedTask;
  }

  @Patch(':id/complete')
  async completeTask(@Param('id', ParseIntPipe) id: number): Promise<Task | string> {
    const completedTask = await this.tasksService.completeTask(id);
    if (!completedTask) { throw new HttpException('Task not found', HttpStatus.NOT_FOUND) }
    return completedTask;
  }

  @Delete(':id')
  async deleteTask(@Param('id', ParseIntPipe) id: number): Promise<Boolean> {
    const result = this.tasksService.deleteTask(id);
    if (!result) { throw new HttpException('Task not found', HttpStatus.NOT_FOUND) }
    return this.tasksService.deleteTask(id);
  }
}
