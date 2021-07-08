import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserStatusDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    userStatus:string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    createdBy:number
}
