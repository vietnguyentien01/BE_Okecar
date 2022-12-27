import * as Mongo from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class File extends Document {
    @Prop({
        type: String,
        required: true,
    })
    url: string

    @Prop({
        type: String,
        required: true,
    })
    key: string

    @Prop({
        type: Number,
    })
    width: number

    @Prop({
        type: Number,
    })
    height: number

    @Prop({
        type: Number,
    })
    size: number

    @Prop({
        type: Date,
    })
    createdAt?: Date
}

export const FileSchema = new Mongo.Schema(SchemaFactory.createForClass(File), {
    timestamps: true,
})
