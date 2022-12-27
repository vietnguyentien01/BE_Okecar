import { INotification } from 'interfaces/notification.interface';
import { Notification } from '../models/notification.schema';
export interface NotificationEntity extends INotification {
}
export declare class NotificationEntity {
    constructor(partial: Partial<Notification>);
}
