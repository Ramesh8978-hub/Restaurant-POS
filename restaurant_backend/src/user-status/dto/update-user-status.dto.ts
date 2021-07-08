import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsBoolean, IsNumber } from 'class-validator';
import { CreateUserStatusDto } from './create-user-status.dto';

export class UpdateUserStatusDto extends PartialType(CreateUserStatusDto) {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    userStatus:string

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    status:boolean

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    updatedBy:number
}
