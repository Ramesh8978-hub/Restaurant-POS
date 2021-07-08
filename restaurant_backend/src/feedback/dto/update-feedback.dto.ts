import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateFeedbackDto } from './create-feedback.dto';

export class UpdateFeedbackDto extends PartialType(CreateFeedbackDto) {

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    waiterId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    customerName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    questionId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    feedback: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    updatedBy: number;

}
