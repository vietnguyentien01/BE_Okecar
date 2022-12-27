import * as Mongo from 'mongoose';
import { Document } from 'mongoose';
export declare class CrawModel extends Document {
    url: string;
    name: string;
    address: string;
    rating: number;
    reviews: number;
    stars: number;
    image: string;
    createdAt: Date;
}
export declare const CrawModelSchema: Mongo.Schema<any, Mongo.Model<any, any, any, any>, any>;
