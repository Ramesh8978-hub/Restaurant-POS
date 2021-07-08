import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNotEmpty, IsNumber } from "class-validator";

export class CreateTableDto {
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
    @IsNumber()
    createdBy:number

}

export class TableStatusDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    tableStatusId:number

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    updatedBy:number
}
