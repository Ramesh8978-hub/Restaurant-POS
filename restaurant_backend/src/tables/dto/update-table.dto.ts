import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsBoolean, IsDate } from 'class-validator';
import { CreateTableDto } from './table.dto';

export class UpdateTableDto extends PartialType(CreateTableDto) {
    
    
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    tableNumber:number

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    sittingCapacity:number

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    status:boolean

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    updatedBy:number
}
