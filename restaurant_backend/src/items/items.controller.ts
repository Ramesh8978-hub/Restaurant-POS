import { Controller, Get, Post, Body, Put, Param, Delete, Request, ParseIntPipe, UsePipes, ValidationPipe, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Observable, of } from 'rxjs';
import { diskStorage } from 'multer';
import path = require('path');
import { v4 as uuidv4 } from 'uuid';
import { ApiBody, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto } from 'src/category/dto/create-category.dto';


export const storage = {
  storage: diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
      const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;
      cb(null, `${filename}${extension}`)
    }
  })
}

@ApiTags('Items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) { }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.addItem(createItemDto);
  }
  @Put('image/:id')
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        imagepath: {
          type: "string",
          format: "binary"
        }
      }
    }
  })
  @ApiParam({name:"id",required:true,type:"string"})
  @UseInterceptors(FilesInterceptor('imagepath', 20, storage))
  async uploadImage(@UploadedFiles() file, @Request() req, @Param("id", ParseIntPipe) id): Promise<Observable<File>> {
    await this.itemsService.uploadFile(id, file, 'imagepath')
    return of(file);
  }

  @Get()
  getAllItems() {
    return this.itemsService.getAllItems();
  }
  
  @Get('status')
  getItemsByStatus() {
    return this.itemsService.getItemsByStatus();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.getItemById(id);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.updateItem(id, updateItemDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.removeItem(id);
  }

  @Post('category')
  getItemsBasedOnCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.itemsService.getItemsBasedOnCategory(createCategoryDto);
  }
  @Post('/reports')
  reportsByDate(@Body() body) {
    return this.itemsService.reportsByDate(body.fromDate,body.toDate);
  }
}
