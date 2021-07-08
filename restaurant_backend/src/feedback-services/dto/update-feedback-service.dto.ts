import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateFeedbackServiceDto } from './create-feedback-service.dto';

export class UpdateFeedbackServiceDto extends PartialType(CreateFeedbackServiceDto) {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    question:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    status:boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    updatedBy:number;
}
