import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { List } from './list.entity';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';

/**
 * Service class is designed to handle all business logic
 * operations. Service provider classes are the next layer
 * in the application after controller classes.
 */
@Injectable() // This decorator marks the below class as provider
export class ListsService {
  constructor(
    @InjectRepository(List)
    private listsRepository: Repository<List>, // Injecting repository as service's dependency 
  ) {}

  public async getAllLists(): Promise<List[]> {
    return await this.listsRepository.find();
  }

  public async getList(id: number): Promise<List | null> {
    return await this.listsRepository.findOneBy({ id });
  }

  // Used to filter lists by associated user ID
  public async getListsByUser(id: number): Promise<List[]> {
    return await this.listsRepository.findBy({ user: { id } });
  }

  /**
   * Used to create new list. If database error occurs,
   * this will return null indicating that the list 
   * was not created.
   * @param createListDto
   * @returns List | null
   */
  public async createList(createListDto: CreateListDto): Promise<List | null> {
    try {
      const newList = this.listsRepository.create(createListDto);
      return await this.listsRepository.save(newList);
    } catch (error) {
      return null;
    }
  }

  /**
   * This function updates desired columns on 
   * list model. If model not found, null is returned.
   * @param id 
   * @param updateListDto - list data to be updated
   * @returns List | null
   */
  public async updateList(
    id: number,
    updateListDto: UpdateListDto
  ): Promise<List | null> {
    const list = await this.getList(id);
    if (!list) { return null; }
    const updateData: Partial<List> = { ...updateListDto };
    try {
      const updatedList = this.listsRepository.merge(list, updateData);
      await this.listsRepository.save(updatedList);
      return updatedList;
    } catch (error) {
      return null;
    }
  }

  /**
   * This function marks the list as completed.
   * If model not found, null is returned.
   * @param id 
   * @returns List | null
   */
   public async completeList(id: number): Promise<List | null> {
    const list = await this.getList(id);
    if (!list) { return null; }
    list.isCompleted = true;
    await this.listsRepository.save(list);
    return list;
  }

  /**
   * Deletes given entry. Returns boolean value
   * that indicates if the entry was deleted.
   * @param id 
   * @returns boolean
   */
  public async deleteList(id: number): Promise<boolean> {
    const list = await this.getList(id);
    if (!list) { return false; }
    await this.listsRepository.delete(list);
    return true;
  }
}
