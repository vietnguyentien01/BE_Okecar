import { Type } from 'class-transformer'
import {
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator'

import { ImageDto } from 'shared/common/dto'
import { CAR_STATUS, ORIGIN } from 'shared/constants'

export class ProductCreateDto {
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => ImageDto)
    readonly avatar: ImageDto[]

    @IsOptional()
    @IsString()
    videoLink: string

    @IsNotEmpty()
    @IsString()
    carCompanyId: string

    @IsNotEmpty()
    @IsString()
    version: string

    @IsNotEmpty()
    @IsNumber()
    year: number

    @IsNotEmpty()
    @IsEnum(CAR_STATUS)
    carStatus: CAR_STATUS

    @IsNotEmpty()
    @IsEnum(ORIGIN)
    origin: ORIGIN

    @IsNotEmpty()
    @IsString()
    nameSeller: string

    @IsNotEmpty()
    @IsString()
    phoneSeller: string

    @IsNotEmpty()
    @IsString()
    addressSeller: string

    @IsNotEmpty()
    @IsString()
    gear: string

    @IsNotEmpty()
    @IsString()
    fuel: string

    @IsNotEmpty()
    @IsString()
    color: string

    @IsNotEmpty()
    @IsNumber()
    price: number

    @IsOptional()
    @IsNumber()
    kilometers: number

    @IsOptional()
    @IsString()
    vehicleQuality: string

    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsOptional()
    @IsString()
    userId: string

    @IsNotEmpty()
    @IsString()
    location: string
}
