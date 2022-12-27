import { Type } from 'class-transformer'
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator'

import { ImageDto } from 'shared/common/dto'

export class CarCompanyCreateDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => ImageDto)
    readonly avatar: ImageDto
}
