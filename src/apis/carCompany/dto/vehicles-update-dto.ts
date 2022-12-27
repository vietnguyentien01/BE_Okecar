import { IsNotEmpty, IsString } from 'class-validator'

export class VehiclesUpdateDto {
    @IsNotEmpty()
    @IsString()
    name: string
}
