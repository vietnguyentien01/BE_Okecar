import * as Mongo from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

import { IImage } from 'interfaces/image'
import { CAR_STATUS, ORIGIN, STATUS } from 'shared/constants'

@Schema()
export class Product extends Document {
    @Prop({
        type: Mongo.Schema.Types.Mixed,
    })
    avatar: IImage[]

    @Prop({
        type: String,
    })
    videoLink: string

    @Prop({
        type: String,
    })
    carCompanyId: string

    @Prop({
        type: String,
    })
    vehiclesId: string

    @Prop({
        type: String,
    })
    versionName: string

    @Prop({
        type: Number,
    })
    year: number

    @Prop({
        type: String,
        enum: Object.values(CAR_STATUS),
    })
    carStatus: CAR_STATUS

    @Prop({
        type: String,
        enum: Object.values(ORIGIN),
    })
    origin: ORIGIN

    @Prop({
        type: String,
    })
    gear: string

    @Prop({
        type: String,
    })
    fuel: string

    @Prop({
        type: String,
    })
    color: string

    @Prop({
        type: Number,
        required: true,
    })
    price: number

    @Prop({
        type: String,
    })
    kilometers: number

    @Prop({
        type: String,
    })
    vehicleQuality: string

    @Prop({
        type: String,
        required: true,
    })
    title: string

    @Prop({
        type: String,
        required: true,
    })
    nameSeller: string

    @Prop({
        type: String,
        required: true,
    })
    phoneSeller: string

    @Prop({
        type: String,
        required: true,
    })
    addressSeller: string

    @Prop({
        type: String,
        required: true,
    })
    userId: string

    @Prop({
        type: String,
        required: true,
    })
    description: string

    @Prop({
        type: String,
        required: true,
    })
    location: string

    @Prop({
        type: String,
        enum: Object.values(STATUS),
        default: STATUS.PENDING,
    })
    status: STATUS

    @Prop({
        type: Date,
    })
    createdAt: Date
}

export const ProductSchema = new Mongo.Schema(
    SchemaFactory.createForClass(Product),
    {
        timestamps: true,
    }
)
