import { Controller, Get, Post, Request, Body, Put, Param, Delete, UseGuards, ParseIntPipe, UseInterceptors, UploadedFiles, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { ChangePasswordDto, CreateUserDto, ForgotPasswordDto, OtpDto, UpdateUserDto, UserStatusDto } from './dto/user.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Observable, of } from 'rxjs';
import { File } from "./user.interface";
import { diskStorage } from 'multer';
import path = require('path');
import { v4 as uuidv4 } from 'uuid';
import { ApiBody, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';



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

// @UseGuards(AuthGuard('jwt'))
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Put('/image/:id')
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
    await this.userService.uploadFile(id, file, 'imagepath')
    return of(file);
  }

  @Get()
  findAll() {
    return this.userService.findUsers();
  }

  @Get('/profile/:id')
  profile(@Param('id', ParseIntPipe) id: number) {
    return this.userService.profile(id);
  }

  @Get('/role/:roleId')
  getEmployeesByRole(@Param('roleId', ParseIntPipe) roleId: number) {
    return this.userService.getEmployeesByRole(roleId);
  }

  @Post('/waiterDetails')
  getWaiters() {
    return this.userService.getWaiters();
  }
  @Post('/waitersAndReceptionist')
  getWaitersAndReceptionist() {
    return this.userService.getWaitersAndReceptionist();
  }

  @Post('/kitchenDetails')
  getKitchen() {
    return this.userService.getKitchen();
  }

  @Post('/availableWaiters')
  getAvailableWaiter() {
    return this.userService.getAvailableWaiter();
  }

  @Put(':id')
  // @UsePipes(ValidationPipe)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Put('/updateUserStatus/:id')
  @UsePipes(ValidationPipe)
  updateUserStatus(@Param('id', ParseIntPipe) id: number, @Body() userStatusDto: UserStatusDto) {
    return this.userService.updateUserStatus(id, userStatusDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }

  @Put('/changePassword/:id')
  @UsePipes(ValidationPipe)
  changePassword(@Param('id', ParseIntPipe) id: number, @Body() changePasswordDto: ChangePasswordDto) {
    return this.userService.changePassword(id, changePasswordDto);
  }

  @Post('/sendOTP')
  sendOTP(@Body() createUserDto: CreateUserDto) {
    return this.userService.sendOTP(createUserDto);
  }
  @Post('/matchOTP')
  @UsePipes(ValidationPipe)
  matchOTP(@Body() otpDto: OtpDto) {
    return this.userService.matchOTP(otpDto);
  }
  @Post('/forgotPassword')
  @UsePipes(ValidationPipe)
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.userService.forgotPassword(forgotPasswordDto);
  }

}
