import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

/**
 * Module encapsulates the logic related to BL entity.
 */
@Module({
  imports: [TypeOrmModule.forFeature([User])], // Define registered repositories for this scope (user module)
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
