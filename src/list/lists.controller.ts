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
import { List } from './list.entity';
import { ListsService } from './lists.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';

/**
 * The purpose of the controller is to handle incoming HTTP requests, validate
 * parameters and pass validated data to the service class to execute business
 * logic requirements.
 */
@Controller('lists')
export class ListsController {
  constructor (
    private readonly listsService: ListsService // Dependency Injection
  ) {}

  @Get()
  async getAllLists(): Promise<List[]> {
    return await this.listsService.getAllLists();
  }

  @Get(':id')
  async getList(@Param('id') id: number): Promise<List | string> {
    const list = await this.listsService.getList(id);
    if (!list) { throw new HttpException('List not found', HttpStatus.NOT_FOUND) }
    return list;
  }

  @Post()
  async createList(
    // Validation pipe will validate the request according to the rules in the DTO
    @Body(ValidationPipe) createListDto: CreateListDto
  ): Promise<List | string> {
    const newList = await this.listsService.createList(createListDto);
    if (!newList) { throw new HttpException('Failed to create list', HttpStatus.UNPROCESSABLE_ENTITY) }
    return newList;
  }

  @Patch(':id')
  async updateList(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateListDto: UpdateListDto // Note the validation pipe and list DTO
  ): Promise<List | string> {
    const updatedList = await this.listsService.updateList(id, updateListDto);
    if (!updatedList) { throw new HttpException('List not found', HttpStatus.NOT_FOUND) }
    return updatedList;
  }

  @Patch(':id/complete')
  async completeList(@Param('id', ParseIntPipe) id: number): Promise<List | string> {
    const completedList = await this.listsService.completeList(id);
    if (!completedList) { throw new HttpException('List not found', HttpStatus.NOT_FOUND) }
    return completedList;
  }

  @Delete(':id')
  async deleteList(@Param('id', ParseIntPipe) id: number): Promise<Boolean> {
    const result = this.listsService.deleteList(id);
    if (!result) { throw new HttpException('List not found', HttpStatus.NOT_FOUND) }
    return this.listsService.deleteList(id);
  }
}
