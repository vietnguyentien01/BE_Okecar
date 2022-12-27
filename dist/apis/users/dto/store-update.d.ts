import { ImageDto } from '../../../shared/common/dto';
export declare class StoreUpdateDto {
    nameStore: string;
    phoneStore: string;
    addressStore: string;
    readonly avatar: ImageDto;
    readonly banner: ImageDto;
}
