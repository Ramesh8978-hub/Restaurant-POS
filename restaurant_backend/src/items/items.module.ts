import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemRepository } from './repository/items.repository';
import { CategoryRepository } from 'src/category/repository/category.repository';
import { UserRepository } from 'src/user/repository/user.repository';

@Module({
  imports:[TypeOrmModule.forFeature([
    ItemRepository,
    CategoryRepository,
    UserRepository
  ])],
  controllers: [ItemsController],
  providers: [ItemsService]
})
export class ItemsModule {}
