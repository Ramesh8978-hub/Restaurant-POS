import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, isDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateOrderDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    tableId:number;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    amount:number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    waiterId:number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    createdBy:number;

}

export class PaymentModeDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    mopId:number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    updatedBy:number;
}
export class ChangeTableDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    tableId:number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    updatedBy:number;
}
export class UpdateAmountDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    amount:number;

    @ApiProperty()
    discount:number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    updatedBy:number;
}

export class OrderStatusDto{
    // @ApiProperty()
    // @IsNotEmpty()
    // @IsNumber()
    // orderStatusId:number;

    // @ApiProperty()
    // @IsNumber()
    // receptionistId:number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    updatedBy:number;

}

