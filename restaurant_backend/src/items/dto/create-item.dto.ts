import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateItemDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    categoryId: number

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    itemName: string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    price: number

    @ApiProperty()
    priority: number

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    createdBy: number

}
