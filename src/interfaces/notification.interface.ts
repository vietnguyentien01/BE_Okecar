import { NOTIFY_TYPE } from '../shared/constants'

export interface INotification {
    id: string
    userId: string
    fromId: string
    objectId: string
    projectId: string
    message?: string
    title: string
    type: NOTIFY_TYPE
    isSeen: boolean
    isRead: boolean
    createdAt: Date
    updatedAt: Date
}
