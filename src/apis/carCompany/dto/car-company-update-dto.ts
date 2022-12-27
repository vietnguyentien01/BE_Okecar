import { Type } from 'class-transformer'
import { IsOptional, IsString, ValidateNested } from 'class-validator'

import { ImageDto } from 'shared/common/dto'

export class CarCompanyUpdateDto {
    @IsOptional()
    @IsString()
    name: string

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => ImageDto)
    readonly avatar: ImageDto
}
