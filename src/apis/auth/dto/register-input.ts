import { Type } from 'class-transformer'
import {
    IsNotEmpty,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator'

import { StoreDto } from './store-input'

export class RegisterInput {
    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsString()
    phone: string

    @IsNotEmpty()
    @IsString()
    userName: string

    @IsNotEmpty()
    @IsString()
    password: string

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => StoreDto)
    readonly storeInfo: StoreDto
}
