import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './list.entity';
import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';

/**
 * Module encapsulates the logic related to BL entity.
 */
@Module({
  imports: [TypeOrmModule.forFeature([List])], // Define registered repositories for this scope (list module)
  providers: [ListsService],
  controllers: [ListsController],
  exports: [ListsService]
})
export class ListsModule {}
