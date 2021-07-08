import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateTableStatusDto } from './create-table-status.dto';

export class UpdateTableStatusDto extends PartialType(CreateTableStatusDto) {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    tableStatus: string

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    status: boolean
  
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    updatedBy:number
}
