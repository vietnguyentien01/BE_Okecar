import * as Mongo from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class CrawModel extends Document {
    @Prop({
        type: String,
        required: true,
        unique: true,
    })
    url: string

    @Prop({
        type: String,
        required: true,
    })
    name: string

    @Prop({
        type: String,
        required: true,
    })
    address: string

    @Prop({
        type: Number,
        default: 0,
    })
    rating: number

    @Prop({
        type: Number,
        default: 0,
    })
    reviews: number

    @Prop({
        type: Number,
        default: 0,
    })
    stars: number

    @Prop({
        type: String,
        required: true,
    })
    image: string

    @Prop({
        type: Date,
    })
    createdAt: Date
}

export const CrawModelSchema = new Mongo.Schema(
    SchemaFactory.createForClass(CrawModel),
    {
        timestamps: true,
    }
)
