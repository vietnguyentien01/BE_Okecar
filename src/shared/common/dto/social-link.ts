// import {
//     IsBoolean,
//     IsEnum,
//     IsNotEmpty,
//     IsOptional,
//     IsString,
// } from 'class-validator'
//
// import { SOCIAL_NAME } from 'shared/constants'
//
// export class SocialLinkDto {
//     @IsNotEmpty()
//     @IsEnum(SOCIAL_NAME)
//     readonly name: SOCIAL_NAME
//
//     @IsNotEmpty()
//     @IsString()
//     readonly url: string
//
//     @IsOptional()
//     @IsBoolean()
//     readonly isPublic: boolean = false
// }
