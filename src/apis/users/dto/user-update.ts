import { Type } from 'class-transformer'
import { IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'

import { ImageDto } from 'shared/common/dto'

export class UserUpdateDto {
    @IsOptional()
    @IsString()
    fullName: string

    @IsOptional()
    @IsString()
    address: string

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => ImageDto)
    readonly avatar: ImageDto

    @IsOptional()
    @IsNumber()
    birthday: number
}
