import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

/**
 * Service class is designed to handle all business logic
 * operations. Service provider classes are the next layer
 * in the application after controller classes.
 */
@Injectable() // This decorator marks the below class as provider
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>, // Injecting repository as service's dependency 
  ) {}

  public async getAllTasks(): Promise<Task[]> {
    return await this.tasksRepository.find();
  }

  public async getTask(id: number): Promise<Task | null> {
    return await this.tasksRepository.findOneBy({ id });
  }

  // public async getTasksByList(listId: number): Promise<Task[]> {
  //   return await this.tasksRepository.findBy({ list: listId });
  // }

  /**
   * Used to create new task. If database error occurs,
   * this will return null indicating that the task 
   * was not created.
   * @param createTaskDto
   * @returns Task | null
   */
  public async createTask(createTaskDto: CreateTaskDto): Promise<Task | null> {
    try {
      const newTask = this.tasksRepository.create(createTaskDto);
      return await this.tasksRepository.save(newTask);
    } catch (error) {
      return null;
    }
  }

  /**
   * This function updates desired columns on 
   * task model. If model not found, null is returned.
   * @param id 
   * @param updateTaskDto - task data to be updated
   * @returns Task | null
   */
  public async updateTask(
    id: number,
    updateTaskDto: UpdateTaskDto
  ): Promise<Task | null> {
    const task = await this.getTask(id);
    if (!task) { return null; }
    const updateData: Partial<Task> = { ...updateTaskDto };
    try {
      const updatedTask = this.tasksRepository.merge(task, updateData);
      await this.tasksRepository.save(updatedTask);
      return updatedTask;
    } catch (error) {
      return null;
    }
  }

  /**
   * Deletes given entry. Returns boolean value
   * that indicates if the entry was deleted.
   * @param id 
   * @returns boolean
   */
  public async deleteTask(id: number): Promise<boolean> {
    const task = await this.getTask(id);
    if (!task) { return false; }
    await this.tasksRepository.delete(task);
    return true;
  }
}
