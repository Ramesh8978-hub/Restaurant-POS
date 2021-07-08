
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toTitleCase } from 'src/common/toLowerCase/toLowerCase';
import { RoleRepository } from 'src/roles/repository/roles.repository';
import { UserRepository } from 'src/user/repository/user.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from './repository/category.repository'

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryRepository) private Categoryrepository: CategoryRepository,
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) { }

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      let createdBy = await this.userRepository.findOne({ id: createCategoryDto.createdBy })
      await this.Categoryrepository.insert({
        category: toTitleCase(createCategoryDto.category),
        status: true,
        createdAt: new Date().toISOString().toString(),
        createdBy: createdBy,
      });
      return{
        status:201,
        message:"Added Successfully"
      }
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getAllCategories() {
    try {
      let category = await this.Categoryrepository.find({ relations: ['createdBy'] })
      return category
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  async getCategoriesByStatus() {
    try {
      let category = await this.Categoryrepository.find({ where: { status: true }, relations: ['createdBy'] })
      return category
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findOne(id: number) {
    try {
      const categoryData = await this.Categoryrepository.findOne({ where: { id }, relations: ['createdBy'] })
      if (!categoryData) {
        throw new HttpException("Cannot find the Category", HttpStatus.NOT_FOUND)
      }
      else {
        return categoryData
      }
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      let category = await this.Categoryrepository.findOne({ where: { id } })
      if (category.status === updateCategoryDto.status) {
        await this.Categoryrepository.update({ id }, {
          category: toTitleCase(updateCategoryDto.category),
          updatedAt: new Date().toISOString().toString(),
          updatedBy: updateCategoryDto.updatedBy
        });
        return {
          status: 200,
          message: 'Updated Successfully'
        }
      }
      else {
        await this.Categoryrepository.update({ id }, {
          status: updateCategoryDto.status,
          updatedAt: new Date().toISOString().toString(),
          updatedBy: updateCategoryDto.updatedBy
        });
        return {
          status: 200,
          message: 'Updated Successfully'
        }
      }
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async remove(id: number) {
    try {
      const categoryData = await this.Categoryrepository.findOne({ where: { id } })
      if (!categoryData) {
        throw new HttpException("Cannot find the Category", HttpStatus.NOT_FOUND)
      }
      else {
        return await this.Categoryrepository.remove(categoryData);
      };
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

}
