import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsBoolean, IsDate, IsNumber } from 'class-validator';
import { CreateOrderStatusDto } from './create-order-status.dto';

export class UpdateOrderStatusDto extends PartialType(CreateOrderStatusDto) {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    orderStatus: string

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    status: boolean

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    updatedBy:number
}
