import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateExpenseDto {
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
    createdBy:number;

    @ApiProperty()
    employeeId:number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    paymentModeId:number;

}

