import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsBoolean, IsDate, IsNumber } from 'class-validator';
import { CreatePaymentModeDto } from './create-payment-mode.dto';

export class UpdatePaymentModeDto extends PartialType(CreatePaymentModeDto) {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    paymentMode: string

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    status: boolean

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    updatedBy:number
}
