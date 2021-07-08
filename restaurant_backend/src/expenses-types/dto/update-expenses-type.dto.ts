import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateExpensesTypeDto } from './create-expenses-type.dto';

export class UpdateExpensesTypeDto extends PartialType(CreateExpensesTypeDto) {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    type:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    status:boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    updatedBy:number;

  
}
