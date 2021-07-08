import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";
export class CreateFeedbackDto {
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
    createdBy: number;


}
