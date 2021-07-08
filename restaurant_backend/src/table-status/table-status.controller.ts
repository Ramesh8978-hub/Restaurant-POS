import { Controller, Get, Post, Body, Put, Param, Delete, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TableStatusService } from './table-status.service';
import { CreateTableStatusDto } from './dto/create-table-status.dto';
import { UpdateTableStatusDto } from './dto/update-table-status.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Table-Status')
@Controller('table-status')
export class TableStatusController {
  constructor(private readonly tableStatusService: TableStatusService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createTableStatusDto: CreateTableStatusDto) {
    return this.tableStatusService.createTableStatus(createTableStatusDto);
  }

  @Get()
  getAllTableStatus() {
    return this.tableStatusService.getAllTableStatus();
  }

  @Get('status')
  getTableStatusByStatus() {
    return this.tableStatusService.getTableStatusByStatus();
  }

  @Get('booked&not-available')
  TableStatusBooked() {
    return this.tableStatusService.TableStatusBooked();
  }
  @Get('available')
  TableStatusAvailable() {
    return this.tableStatusService.TableStatusAvailable();
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.tableStatusService.getTableStatusById(+id);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  update(@Param('id',ParseIntPipe) id: number, @Body() updateTableStatusDto: UpdateTableStatusDto) {
    return this.tableStatusService.update(id, updateTableStatusDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.tableStatusService.remove(id);
  }
  
}
