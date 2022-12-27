import * as Mongo from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

import { NOTIFY_TYPE } from 'shared/constants'

@Schema()
export class Notification extends Document {
    @Prop({
        type: String,
        required: true,
    })
    userId: string

    @Prop({
        type: String,
    })
    fromId: string

    @Prop({
        type: String,
        required: true,
    })
    message?: string

    @Prop({
        type: String,
        required: true,
    })
    title?: string

    @Prop({
        type: String,
        required: true,
    })
    objectId: string

    @Prop({
        type: String,
        default: '',
    })
    projectId: string

    @Prop({
        type: String,
        required: true,
        enum: Object.values(NOTIFY_TYPE),
    })
    type: NOTIFY_TYPE

    @Prop({
        type: Boolean,
        default: false,
    })
    isSeen?: boolean

    @Prop({
        type: Boolean,
        default: false,
    })
    isRead?: boolean

    @Prop({
        type: Date,
    })
    createdAt: Date

    @Prop({
        type: Date,
    })
    updatedAt: Date
}

export const NotificationSchema = new Mongo.Schema(
    SchemaFactory.createForClass(Notification),
    {
        timestamps: true,
    }
)
