import * as Mongo from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

import { ORDER_STATUS, PAYMENT_STATUS } from 'shared/constants'

@Schema()
export class Order extends Document {
    @Prop({
        type: String,
        required: true,
    })
    buyerId: string

    @Prop({
        type: String,
        required: true,
    })
    sellerId: string

    @Prop({
        type: String,
        required: true,
    })
    newsId: string

    @Prop({
        type: Date,
        required: true,
    })
    bookingDate: Date

    @Prop({
        type: Date,
    })
    paymentTime: Date

    @Prop({
        type: String,
        default: PAYMENT_STATUS.UN_PAID,
        enum: Object.values(PAYMENT_STATUS),
    })
    paymentStatus: PAYMENT_STATUS

    @Prop({
        type: String,
        default: ORDER_STATUS.CONFIRMING,
        enum: Object.values(ORDER_STATUS),
    })
    orderStatus: ORDER_STATUS

    @Prop({
        type: Date,
    })
    createdAt: Date

    @Prop({
        type: Date,
    })
    updatedAt: Date
}

export const OrderSchema = new Mongo.Schema(
    SchemaFactory.createForClass(Order),
    {
        timestamps: true,
    }
)
