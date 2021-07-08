import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateOrdersItemDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    orderId:number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    itemId:number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    categoryId:number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    quantity:number;

    @ApiProperty()
    description:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    createdBy:number;

}
export class QuantityDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    quantity:number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    updatedBy:number;
}

export class KitchenStatusDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    kitchenStatusId:number;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    updatedBy:number;
}