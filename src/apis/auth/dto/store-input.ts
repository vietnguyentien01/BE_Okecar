import { Type } from 'class-transformer'
import {
    IsNotEmpty,
    IsString,
    ValidateNested,
} from 'class-validator'

import { ImageDto } from '../../../shared/common/dto'

export class StoreDto {
    @IsNotEmpty()
    @IsString()
    nameStore: string

    @IsNotEmpty()
    @IsString()
    phoneStore: string

    @IsNotEmpty()
    @IsString()
    addressStore: string

    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => ImageDto)
    readonly avatar: ImageDto

    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => ImageDto)
    readonly banner: ImageDto
}
