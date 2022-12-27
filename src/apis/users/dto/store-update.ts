import { Type } from 'class-transformer'
import {
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator'

import { ImageDto } from '../../../shared/common/dto'

export class StoreUpdateDto {
    @IsOptional()
    @IsString()
    nameStore: string

    @IsOptional()
    @IsString()
    phoneStore: string

    @IsOptional()
    @IsString()
    addressStore: string

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => ImageDto)
    readonly avatar: ImageDto

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => ImageDto)
    readonly banner: ImageDto
}
