import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

/**
 * Service class is designed to handle all business logic
 * operations. Service provider classes are the next layer
 * in the application after controller classes.
 */
@Injectable() // This decorator marks the below class as provider
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>, // Injecting repository as service's dependency 
  ) {}

  public async getAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  public async getOne(id: number): Promise<User | null> {
    return await this.usersRepository.findOneBy({ id });
  }

  /**
   * Used to create new user. If database error occurs,
   * this will return null indicating that the user 
   * was not created.
   * @param createUserDto
   * @returns User | null
   */
  public async create(createUserDto: CreateUserDto): Promise<User | null> {
    try {
      // Hash the password
      const userPassword = createUserDto.password;
      createUserDto.password = await bcrypt.hash(userPassword, 10);

      const newUser = this.usersRepository.create({ ...createUserDto });
      return await this.usersRepository.save(newUser);
    } catch (error) {
      return null;
    }
  }
}
