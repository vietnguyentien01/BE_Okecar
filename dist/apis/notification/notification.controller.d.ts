import { RequestInfoType } from 'shared/common/types';
import { PaginationDto } from '../../shared/common/dto';
import { NotificationEntity } from './entities/notification.entity';
import { NotificationService } from './notification.service';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    viewById(id: string, ctx: RequestInfoType): Promise<NotificationEntity>;
    getNotification(query: PaginationDto, ctx: RequestInfoType): Promise<{
        data: {
            id: string;
            userId: string;
            fromId: string;
            objectId: string;
            projectId: string;
            message?: string;
            title: string;
            type: import("../../shared/constants").NOTIFY_TYPE;
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
}
