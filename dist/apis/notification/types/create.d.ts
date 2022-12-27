import { NOTIFY_TYPE } from 'shared/constants';
export declare class CreateNotification {
    fromId?: string;
    userId?: string;
    message: string;
    uniqueKey: string;
    objectId?: string;
    projectId: string;
    type: NOTIFY_TYPE;
    title: string;
}
