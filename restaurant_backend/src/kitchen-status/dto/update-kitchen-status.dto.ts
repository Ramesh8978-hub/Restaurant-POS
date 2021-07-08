import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsBoolean, IsDate, IsNumber } from 'class-validator';
import { CreateKitchenStatusDto } from './create-kitchen-status.dto';

export class UpdateKitchenStatusDto extends PartialType(CreateKitchenStatusDto) {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    kitchenStatus: string

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    status: boolean

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    updatedBy:number
}
