import { Controller, Get, Post, Body, Put, Param, Delete, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { ExpensesTypesService } from './expenses-types.service';
import { CreateExpensesTypeDto } from './dto/create-expenses-type.dto';
import { UpdateExpensesTypeDto } from './dto/update-expenses-type.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Expenses-Types')
@Controller('expenses-types')
export class ExpensesTypesController {
  constructor(private readonly expensesTypesService: ExpensesTypesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createExpensesTypeDto: CreateExpensesTypeDto) {
    return this.expensesTypesService.create(createExpensesTypeDto);
  }

  @Get()
  findAll() {
    return this.expensesTypesService.findAll();
  }

  @Get('status')
  findAllByStatus() {
    return this.expensesTypesService.findAllByStatus();
  }


  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.expensesTypesService.findOne(id);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  update(@Param('id',ParseIntPipe) id: number, @Body() updateExpensesTypeDto: UpdateExpensesTypeDto) {
    return this.expensesTypesService.update(id, updateExpensesTypeDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.expensesTypesService.remove(id);
  }
}
