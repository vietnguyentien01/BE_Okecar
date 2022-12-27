import { IsNotEmpty, IsString } from 'class-validator'

export class VehiclesCreateDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    carCompanyId: string
}
