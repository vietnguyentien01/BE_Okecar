import * as Mongo from 'mongoose';
import { Document } from 'mongoose';
import { NOTIFY_TYPE } from 'shared/constants';
export declare class Notification extends Document {
    userId: string;
    fromId: string;
    message?: string;
    title?: string;
    objectId: string;
    projectId: string;
    type: NOTIFY_TYPE;
    isSeen?: boolean;
    isRead?: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare const NotificationSchema: Mongo.Schema<any, Mongo.Model<any, any, any, any>, any>;
