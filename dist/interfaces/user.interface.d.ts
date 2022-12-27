import { ROLE } from 'shared/constants';
import { IImage } from './image';
export interface IUser {
    id: string;
    email: string;
    phone: string;
    userName: string;
    fullName: string;
    address: string;
    birthday: number;
    role: ROLE;
    avatar: IImage;
    isBlocked: boolean;
    storeInfo: IStore;
    createdAt: Date;
}
export interface IStore {
    nameStore: string;
    avatar: IImage;
    banner: IImage;
    phoneStore: string;
    addressStore: string;
}
