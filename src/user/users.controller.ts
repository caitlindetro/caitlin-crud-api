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
import { User } from "./user.entity";
import { UsersService } from "./users.service";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

/**
 * The purpose of the controller is to handle incoming HTTP requests, validate
 * parameters and pass validated data to the service class to execute business
 * logic requirements.
 */
@Controller('users')
export class UsersController {
  constructor (
    private readonly usersService: UsersService // Dependency Injection
  ) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.usersService.getAllUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: number): Promise<User | string> {
    const user = await this.usersService.getUser(id);
    if (!user) { throw new HttpException('User not found', HttpStatus.NOT_FOUND) }
    return user;
  }

  @Post()
  async createUser(
    // Validation pipe will validate the request according to the rules in the DTO
    @Body(ValidationPipe) createUserDto: CreateUserDto
  ): Promise<User | string> {
    const newUser = await this.usersService.createUser(createUserDto);
    if (!newUser) { throw new HttpException('Failed to create user', HttpStatus.UNPROCESSABLE_ENTITY) }
    return newUser;
  }

  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto // Note the validation pipe and user DTO
  ): Promise<User | string> {
    const updatedUser = await this.usersService.updateUser(id, updateUserDto);
    if (!updatedUser) { throw new HttpException('User not found', HttpStatus.NOT_FOUND) }
    return updatedUser;
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<Boolean> {
    const result = this.usersService.deleteUser(id);
    if (!result) { throw new HttpException('User not found', HttpStatus.NOT_FOUND) }
    return this.usersService.deleteUser(id);
  }
}
