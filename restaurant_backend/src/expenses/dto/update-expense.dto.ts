import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateExpenseDto } from './create-expense.dto';

export class UpdateExpenseDto extends PartialType(CreateExpenseDto) {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    expenseTypeId:number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name:string;

    @ApiProperty()
    discription:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    amount:number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    updatedBy:number;

    @ApiProperty()
    employeeId:number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    paymentModeId:number;

}
