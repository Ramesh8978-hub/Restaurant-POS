import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsEmpty, isEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTableStatusDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    tableStatus: string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    createdBy:number
}
