import { Controller, Get, Post, Body, Put, Param, Delete, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { UserStatusService } from './user-status.service';
import { CreateUserStatusDto } from './dto/create-user-status.dto';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';
import { ApiTags } from '@nestjs/swagger';


//@UseGuards(AuthGuard('jwt'))
@ApiTags('User-Status')
@Controller('user-status')
export class UserStatusController {
  constructor(private readonly userStatusService: UserStatusService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createUserStatusDto: CreateUserStatusDto) {
    return this.userStatusService.createuserStatus(createUserStatusDto);
  }

  @Get()
  findAll() {
    return this.userStatusService.getAllUserStatus();
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.userStatusService.getUserStatusById(id);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  update(@Param('id',ParseIntPipe) id: number, @Body() updateUserStatusDto: UpdateUserStatusDto) {
    return this.userStatusService.updateUserStatus(id, updateUserStatusDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.userStatusService.removeUserStatus(id);
  }

  @Post('not-available')
  userStatus() {
    return this.userStatusService.userStatus();
  }
}
