import {
    Controller,
    Get,
    Param,
    Query,
    Request,
    UseGuards,
} from '@nestjs/common'

import { AuthGuard } from 'plugins/guards'
import { RequestInfoType } from 'shared/common/types'

import { PaginationDto } from '../../shared/common/dto'
import { NotificationEntity } from './entities/notification.entity'
import { NotificationService } from './notification.service'

@Controller()
@UseGuards(AuthGuard)
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    @Get('/notifications/:id')
    @UseGuards(AuthGuard)
    async viewById(
        @Param('id') id: string,
        @Request() ctx: RequestInfoType
    ): Promise<NotificationEntity> {
        const notifications = await this.notificationService.viewNotification(
            id,
            {
                userId: ctx.user.id,
            }
        )
        return new NotificationEntity(notifications)
    }

    @Get('/notifications')
    @UseGuards(AuthGuard)
    async getNotification(
        @Query() query: PaginationDto,
        @Request() ctx: RequestInfoType
    ) {
        const args = {
            sort: { createdAt: -1 },
            pagination: query,
        }
        const notifications = await this.notificationService.getList(
            args,
            ctx.user.id
        )
        return {
            data: notifications.data.map((notifications) => notifications),
            meta: notifications.meta,
        }
    }
}
