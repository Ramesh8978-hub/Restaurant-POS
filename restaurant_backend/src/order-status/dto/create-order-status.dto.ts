import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsBoolean, IsDate, IsNumber } from "class-validator"

export class CreateOrderStatusDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    orderStatus: string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    createdBy:number

}
