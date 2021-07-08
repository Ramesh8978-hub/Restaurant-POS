import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe, ValidationPipe, UsePipes, UseGuards } from '@nestjs/common';
import { TablesService } from './tables.service';
import { CreateTableDto, TableStatusDto } from './dto/table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Tables')
// @ApiBearerAuth("access-token")
// @UseGuards(AuthGuard('jwt'))
@Controller('tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createTableDto: CreateTableDto) {
    return this.tablesService.createTable(createTableDto);
  }

  @Get()
  getAllTables() {
    return this.tablesService.getAllTables();
  }

  @Get('status')
  getTablesByStatus() {
    return this.tablesService.getTablesByStatus();
  }

  @Get('served-tables')
  getServedTables() {
    return this.tablesService.getServedTables();
  }

  @Get('available')
  getAvailableTAbles() {
    return this.tablesService.getAvailableTables();
  }

  @Get('availableAndBooked')
  getAvailableAndBookeTables() {
    return this.tablesService.getAvailableAndBookeTables();
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.tablesService.getTableById(id);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  update(@Param('id',ParseIntPipe) id: number, @Body() updateTableDto: UpdateTableDto) {
    return this.tablesService.updateTable(id, updateTableDto);
  }

  @Put('/updateTableStatus/:id')
  @UsePipes(ValidationPipe)
  updateTableStatus(@Param('id',ParseIntPipe) id: number, @Body() tableStatusDto: TableStatusDto) {
    return this.tablesService.updateTableStatus(id, tableStatusDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.tablesService.removeTable(id);
  }
}
