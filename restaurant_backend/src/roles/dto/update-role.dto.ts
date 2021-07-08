import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateRoleDto } from './create-role.dto';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    role:string

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    status:boolean

    
}
