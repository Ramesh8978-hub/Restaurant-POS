import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePaymentModeDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    paymentMode: string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    createdBy:number

   
}
