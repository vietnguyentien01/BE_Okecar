import { Model } from 'mongoose';
import { IListRequest } from '../../shared/common/interfaces';
import { Notification } from './models/notification.schema';
import { CreateNotification } from './types/create';
export declare class NotificationService {
    private readonly NotificationModel;
    constructor(NotificationModel: Model<Notification>);
    createNotification(doc: CreateNotification): void;
    viewNotification(_id: string, options: {
        userId: string;
    }): Promise<Notification>;
    getList(args: IListRequest, userId: string): Promise<{
        data: {
            id: string;
            userId: string;
            fromId: string;
            objectId: string;
            projectId: string;
            message?: string;
            title: string;
            type: import("shared/constants").NOTIFY_TYPE;
            isSeen: boolean;
            isRead: boolean;
            createdAt: Date;
            updatedAt: Date;
        }[];
        meta: {
            limit: number;
            offset: number;
            total: any;
            totalPages: number;
        };
    }>;
    readAllNotifications(userId: string): Promise<any>;
}
