import { Controller, Get, Post, Body, Put, Param, Delete, ValidationPipe, UsePipes, ParseIntPipe } from '@nestjs/common';
import { KitchenStatusService } from './kitchen-status.service';
import { CreateKitchenStatusDto } from './dto/create-kitchen-status.dto';
import { UpdateKitchenStatusDto } from './dto/update-kitchen-status.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Kitchen-Status')
@Controller('kitchen-status')
export class KitchenStatusController {
  constructor(private readonly kitchenStatusService: KitchenStatusService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createKitchenStatusDto: CreateKitchenStatusDto) {
    return this.kitchenStatusService.create(createKitchenStatusDto);
  }

  @Get()
  findAll() {
    return this.kitchenStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.kitchenStatusService.findOne(id);
  }

  @Put(':id')
  // @UsePipes(ValidationPipe)
  update(@Param('id',ParseIntPipe) id: number, @Body() updateKitchenStatusDto: UpdateKitchenStatusDto) {
    return this.kitchenStatusService.update(id, updateKitchenStatusDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.kitchenStatusService.remove(id);
  }
}
