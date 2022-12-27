import * as Mongo from 'mongoose';
import { Document } from 'mongoose';
export declare class Vehicles extends Document {
    name: string;
    carCompanyId: string;
    createdAt?: Date;
}
export declare const VehiclesSchema: Mongo.Schema<any, Mongo.Model<any, any, any, any>, any>;
