import * as Mongo from 'mongoose';
import { Document } from 'mongoose';
export declare class File extends Document {
    url: string;
    key: string;
    width: number;
    height: number;
    size: number;
    createdAt?: Date;
}
export declare const FileSchema: Mongo.Schema<any, Mongo.Model<any, any, any, any>, any>;
