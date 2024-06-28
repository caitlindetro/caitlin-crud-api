import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  ValidationPipe
} from '@nestjs/common';
import { User } from "./user.entity";
import { UsersService } from "./users.service";
import { CreateUserDto } from './dto/create-user.dto';

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
  async getAll(): Promise<User[]> {
    return await this.usersService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<User | string> {
    const user = await this.usersService.getOne(id);
    if (!user) { throw new HttpException('User not found', HttpStatus.NOT_FOUND) }
    return user;
  }

  @Post()
  async create(
    // Validation pipe will validate the request according to the rules in the DTO
    @Body(ValidationPipe) createUserDto: CreateUserDto
  ): Promise<User | string> {
    const newUser = await this.usersService.create(createUserDto);
    if (!newUser) { throw new HttpException('Failed to create user', HttpStatus.UNPROCESSABLE_ENTITY) }
    return newUser;
  }
}
