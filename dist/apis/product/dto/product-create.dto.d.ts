import { ImageDto } from 'shared/common/dto';
import { CAR_STATUS, ORIGIN } from 'shared/constants';
export declare class ProductCreateDto {
    readonly avatar: ImageDto[];
    videoLink: string;
    carCompanyId: string;
    version: string;
    year: number;
    carStatus: CAR_STATUS;
    origin: ORIGIN;
    nameSeller: string;
    phoneSeller: string;
    addressSeller: string;
    gear: string;
    fuel: string;
    color: string;
    price: number;
    kilometers: number;
    vehicleQuality: string;
    title: string;
    description: string;
    userId: string;
    location: string;
}
