import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateRoleDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    role:string


    
    
}
