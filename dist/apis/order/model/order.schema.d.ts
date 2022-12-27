import * as Mongo from 'mongoose';
import { Document } from 'mongoose';
import { ORDER_STATUS, PAYMENT_STATUS } from 'shared/constants';
export declare class Order extends Document {
    buyerId: string;
    sellerId: string;
    newsId: string;
    bookingDate: Date;
    paymentTime: Date;
    paymentStatus: PAYMENT_STATUS;
    orderStatus: ORDER_STATUS;
    createdAt: Date;
    updatedAt: Date;
}
export declare const OrderSchema: Mongo.Schema<any, Mongo.Model<any, any, any, any>, any>;
