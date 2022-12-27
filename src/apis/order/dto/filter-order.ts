import { IsOptional, IsString } from 'class-validator'

export class FilterOrder {
    @IsOptional()
    @IsString()
    status?: string

    @IsOptional()
    @IsString()
    buyerId?: string

    @IsOptional()
    @IsString()
    sellerId?: string
}
