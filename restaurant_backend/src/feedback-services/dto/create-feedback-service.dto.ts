import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";
export class CreateFeedbackServiceDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    question:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    createdBy:number;

    
}
