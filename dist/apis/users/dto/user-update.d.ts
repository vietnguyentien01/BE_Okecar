import { ImageDto } from 'shared/common/dto';
export declare class UserUpdateDto {
    fullName: string;
    address: string;
    readonly avatar: ImageDto;
    birthday: number;
}
