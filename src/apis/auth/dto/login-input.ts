import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class LoginDto {
    @IsNotEmpty()
    @IsString()
    userName: string

    @IsNotEmpty()
    @IsString()
    password: string
}

export class StaffLoginDto {
    @IsNotEmpty()
    @IsString()
    email: string
}

export class PreRegisterDto {
    @IsNotEmpty()
    @IsString()
    email: string
}

export class VerifyStaffLoginDto {
    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsString()
    code: string
}

export class VerifyDto {
    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsNumber()
    code: number
}

export class ChangePassword {
    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsString()
    oldPassword: string

    @IsNotEmpty()
    @IsString()
    newPassword: string
}

export class forgotPass {
    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsString()
    newPassword: string
}
