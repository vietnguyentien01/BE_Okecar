import * as Mongo from 'mongoose';
import { Document } from 'mongoose';
export declare class Version extends Document {
    name: string;
    vehiclesId: string;
    createdAt?: Date;
}
export declare const VersionSchema: Mongo.Schema<any, Mongo.Model<any, any, any, any>, any>;
