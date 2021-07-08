import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsBoolean, IsNumber, IsDate } from "class-validator"

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    roleId:number

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    firstName:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    lastName:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    username:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    email:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    mobileNo:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    aadharNo:string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    age:number

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    address:string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    createdBy:number


}

export class UpdateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    firstName:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    lastName:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    email:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    mobileNo:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    aadharNo:string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    age:number

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    address:string

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    status:boolean

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    updatedBy:number

}

export class UserStatusDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    userStatusId:number
   
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    updatedBy:number
}

export class ChangePasswordDto {
    @ApiProperty()
    @IsNotEmpty()
    password:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    newpassword:string
   
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    updatedBy:number
}
export class OtpDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    email:string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    otp:number
 
}

export class ForgotPasswordDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    email:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password:string
   
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    updatedBy:number
}