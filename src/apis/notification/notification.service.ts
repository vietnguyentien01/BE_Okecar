import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Promise } from 'mongoose'

import { COLLECTION, ERROR } from 'shared/constants'

import { IListRequest } from '../../shared/common/interfaces'
import { NotificationEntity } from './entities/notification.entity'
import { Notification } from './models/notification.schema'
import { CreateNotification } from './types/create'

@Injectable()
export class NotificationService {
    constructor(
        @InjectModel(COLLECTION.NOTIFICATION)
        private readonly NotificationModel: Model<Notification>
    ) {}

    createNotification(doc: CreateNotification) {
        const newNotification = new this.NotificationModel({ ...doc })
        newNotification.save(function (err) {
            console.log(err)
        })
    }

    async viewNotification(
        _id: string,
        options: { userId: string }
    ): Promise<Notification> {
        const { userId } = options
        const notify: Notification = await this.NotificationModel.findById(_id)
        if (!notify) {
            throw new NotFoundException(ERROR.CAN_NOT_FIND_DATA)
        }
        if (userId !== notify.userId) {
            throw new ForbiddenException()
        }
        const newNotification = await this.NotificationModel.findByIdAndUpdate(
            _id,
            { isRead: true },
            { new: true }
        )

        return newNotification
    }

    async getList(args: IListRequest, userId: string) {
        const { limit, offset } = args.pagination
        const notifications = await this.NotificationModel.find({
            userId: userId,
        })
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(offset * limit)

        if (!notifications) {
            throw new NotFoundException()
        }

        const [total] = await Promise.all([
            this.NotificationModel.count({ userId: userId }),
        ])
        return {
            data: notifications.map((notification) => {
                return {
                    ...new NotificationEntity(notification),
                }
            }),
            meta: {
                limit: limit,
                offset: offset,
                total: total,
                totalPages: Math.ceil(total / args.pagination.limit),
            },
        }
    }

    // async getNotifications(
    //     args: IListingInput,
    //     option?: {
    //         wheres?: WhereInput[]
    //     }
    // ): Promise<IListReturn<INotification>> {}

    async readAllNotifications(userId: string): Promise<any> {
        try {
            await this.NotificationModel.updateMany(
                {
                    userId,
                    isRead: false,
                },
                { isRead: true, isSeen: true }
            )

            return true
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }
}
