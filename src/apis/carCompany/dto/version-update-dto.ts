import { IsNotEmpty, IsString } from 'class-validator'

export class VersionUpdateDto {
    @IsNotEmpty()
    @IsString()
    name: string
}
