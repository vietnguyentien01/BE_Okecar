import { IsNotEmpty, IsString } from 'class-validator'

export class VersionCreateDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    vehiclesId: string
}
