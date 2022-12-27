import { IsOptional, IsString } from 'class-validator'

export class FilterProduct {
    @IsOptional()
    status?: string

    @IsOptional()
    carStatus?: string

    @IsOptional()
    origin?: string

    @IsOptional()
    carCompanyId?: string

    @IsOptional()
    userId?: string

    @IsOptional()
    @IsString()
    keyword?: string
}
