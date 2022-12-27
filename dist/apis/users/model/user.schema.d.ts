import * as Mongo from 'mongoose';
import { Document } from 'mongoose';
import { IImage } from 'interfaces/image';
import { IStore } from 'interfaces/user.interface';
import { ROLE } from 'shared/constants';
export declare class User extends Document {
    phone: string;
    email: string;
    userName?: string;
    fullName?: string;
    address?: string;
    birthday?: number;
    password: string;
    isBlocked: boolean;
    avatar?: IImage;
    storeInfo?: IStore;
    role: ROLE;
    createdAt?: Date;
}
export declare const UserSchema: Mongo.Schema<any, Mongo.Model<any, any, any, any>, any>;
