import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsBoolean, IsDate, IsNumber } from 'class-validator';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    category:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    status:boolean;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    updatedBy:number;
}
