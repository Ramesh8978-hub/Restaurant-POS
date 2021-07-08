import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateExpensesTypeDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    type:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    createdBy:number;

  

}
