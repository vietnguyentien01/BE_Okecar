import { INotification } from 'interfaces/notification.interface'

import { Notification } from '../models/notification.schema'

// eslint-disable-next-line
export interface NotificationEntity extends INotification {}

export class NotificationEntity {
    constructor(partial: Partial<Notification>) {
        if (partial) {
            this.id = partial._id ? partial._id.toString() : partial.id
            this.userId = partial.userId
            this.fromId = partial.fromId
            this.message = partial.message
            this.title = partial.title
            this.objectId = partial.objectId
            this.projectId = partial.projectId
            this.type = partial.type
            this.isRead = partial.isRead
            this.isSeen = partial.isSeen
            this.createdAt = partial.createdAt
            this.updatedAt = partial.updatedAt
        }
    }
}
