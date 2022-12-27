import { IsBoolean, IsOptional } from 'class-validator'

export class AdminUpdateDto {
    @IsOptional()
    @IsBoolean()
    readonly isBlocked: boolean
}
