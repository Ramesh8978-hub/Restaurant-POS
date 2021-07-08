import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsBoolean, IsDate } from 'class-validator';
import { CreateItemDto } from './create-item.dto';

export class UpdateItemDto extends PartialType(CreateItemDto) {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    itemName: string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    price: number

    @IsNotEmpty()
    priority: number

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    status: boolean

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    updatedBy:number

}
