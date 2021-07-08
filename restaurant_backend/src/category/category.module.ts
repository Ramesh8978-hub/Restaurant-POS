import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryRepository } from './repository/category.repository';
import { RoleRepository } from 'src/roles/repository/roles.repository';
import { UserRepository } from 'src/user/repository/user.repository';

@Module({
  imports :[TypeOrmModule.forFeature([CategoryRepository,UserRepository])],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
