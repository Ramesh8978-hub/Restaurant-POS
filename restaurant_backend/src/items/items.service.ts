import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemRepository } from './repository/items.repository';
import { File } from './items.interface'
import { CategoryRepository } from 'src/category/repository/category.repository';
import { UserRepository } from 'src/user/repository/user.repository';
import { toTitleCase } from 'src/common/toLowerCase/toLowerCase'
import { CreateCategoryDto } from 'src/category/dto/create-category.dto';
import { Item } from './entities/item.entity';
import { startOfDay, endOfDay } from 'date-fns';
import { Between } from 'typeorm';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(ItemRepository) private itemRepository: ItemRepository,
    @InjectRepository(CategoryRepository) private categoryRepository: CategoryRepository,
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) { }



  async addItem(createItemDto: CreateItemDto) {
    try {
      let catagory = await this.categoryRepository.findOne({ id: createItemDto.categoryId })
      let createdBy = await this.userRepository.findOne({ id: createItemDto.createdBy })
      let itemsdata = await this.itemRepository.insert({
        category: catagory,
        itemName: toTitleCase(createItemDto.itemName),
        price: createItemDto.price,
        priority: createItemDto.priority,
        status: true,
        createdAt: new Date().toISOString().toString(),
        createdBy: createdBy
      })
      return {
        status: 201,
        message: "Added Successfully",
        itemsdata,
      }
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async uploadFile(id: number, files: File[], path: string) {
    for await (var file of files) {
      if (path == "imagepath") {
        await this.itemRepository.update({ id }, { [path]: file.filename })
      }
    }
    return {
      status: 200,
      message: 'Image Updated Successfully'
    }
  }

  async getAllItems() {
    try {
      let categories = await this.categoryRepository.find({ where: { status: true } })
      let list = [];
      for await (let category of categories) {
        let item = await this.itemRepository.find({ where: { category: category }, relations: ['category', 'createdBy'] });
        if (item.length > 0) {
          list = [...list, ...item]
        }
      }
      return list
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getItemsByStatus() {
    try {
      let categories = await this.categoryRepository.find({ where: { status: true } })
      let list = [];
      for await (let category of categories) {
        let item = await this.itemRepository.find({ where: { status: true, category: category }, relations: ['category', 'createdBy'] });
        if (item.length > 0) {
          list = [...list, ...item]
        }
      }
      return list
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getItemById(id: number) {
    try {
      const itemData = await this.itemRepository.findOne({ where: { id }, relations: ['category', 'createdBy'] });
      if (!itemData) {
        throw new HttpException("Cannot find the Item", HttpStatus.NOT_FOUND)
      }
      else {
        return itemData;
      }
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async updateItem(id: number, updateItemDto: UpdateItemDto) {
    try {
      let catagory = await this.categoryRepository.findOne({ id: updateItemDto.categoryId })
      let item = await this.itemRepository.findOne({ id });
      if (item.status === updateItemDto.status) {
        await this.itemRepository.update({ id }, {
          category: catagory,
          itemName: toTitleCase(updateItemDto.itemName),
          price: updateItemDto.price,
          priority: updateItemDto.priority,
          updatedAt: new Date().toISOString().toString(),
          updatedBy: updateItemDto.updatedBy
        })
        return {
          status: 200,
          message: 'Updated Successfully'
        }
      }
      else {
        await this.itemRepository.update({ id }, {
          status: updateItemDto.status,
          updatedAt: new Date().toISOString().toString(),
          updatedBy: updateItemDto.updatedBy
        })
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

  async removeItem(id: number) {
    try {
      const itemData = await this.itemRepository.findOne(id)
      if (!itemData) {
        throw new HttpException("Cannot find the Item", HttpStatus.NOT_FOUND)
      }
      else {
        return await this.itemRepository.remove(itemData);
      }
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getItemsBasedOnCategory(createCategoryDto: CreateCategoryDto) {
    try {
      let data = await this.categoryRepository.findOne({ where: { status: true, category: createCategoryDto.category } })
      return this.itemRepository.find({ where: { status: true, category: data }, relations: ['category'] })
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  async reportsByDate(fromDate: string, toDate: string) {
    try {
      console.log("not null",fromDate , "=>", toDate);

      return await this.itemRepository.find({
        where: {
          createdAt: Between(startOfDay(Date.parse(fromDate)), endOfDay(Date.parse(toDate))),
        },
        relations: ['category', 'createdBy']
      });
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
