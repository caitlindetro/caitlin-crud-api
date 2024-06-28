import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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

  public async getAllUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  public async getUser(id: number): Promise<User | null> {
    return await this.usersRepository.findOneBy({ id });
  }

  /**
   * Used to create new user. If database error occurs,
   * this will return null indicating that the user 
   * was not created.
   * @param createUserDto
   * @returns User | null
   */
  public async createUser(createUserDto: CreateUserDto): Promise<User | null> {
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

  /**
   * This function updates desired columns on 
   * user model. If model not found, null is returned.
   * @param id 
   * @param updateUserDto - user data to be updated
   * @returns User | null
   */
  public async updateUser(
    id: number,
    updateUserDto: UpdateUserDto
  ): Promise<User | null> {
    const user = await this.getUser(id);
    if (!user) { return null; }
    const updateData: Partial<User> = { ...updateUserDto };
    try {
      const updatedUser = this.usersRepository.merge(user, updateData);
      await this.usersRepository.save(updatedUser);
      return updatedUser;
    } catch (error) {
      return null;
    }
  }

  /**
   * Soft deletes given entry. Returns boolean value
   * that indicates if the entry was deleted.
   * @param id 
   * @returns boolean
   */
  public async deleteUser(id: number): Promise<boolean> {
    const user = await this.getUser(id);
    if (!user) { return false; }
    // Safe delete
    user.isDeleted = true;
    await this.usersRepository.save(user);
    return true;
  }
}
