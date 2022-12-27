import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class ImageDto {
    @IsOptional()
    @IsNumber()
    readonly width: number

    @IsOptional()
    @IsNumber()
    readonly height: number

    @IsString()
    @IsNotEmpty()
    readonly url: string

    @IsOptional()
    @IsString()
    readonly blurHash: string
}
