import * as Mongo from 'mongoose';
import { Document } from 'mongoose';
import { IImage } from '../../../interfaces/image';
export declare class CarCompany extends Document {
    name: string;
    avatar?: IImage;
    createdAt?: Date;
}
export declare const CarCompanySchema: Mongo.Schema<any, Mongo.Model<any, any, any, any>, any>;
