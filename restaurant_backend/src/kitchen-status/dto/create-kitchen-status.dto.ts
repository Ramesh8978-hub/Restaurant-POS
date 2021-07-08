import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsNumber, IsBoolean, IsDate, IsUppercase } from "class-validator"

export class CreateKitchenStatusDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    kitchenStatus: string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    createdBy:number

}
