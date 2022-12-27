import * as Mongo from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class Version extends Document {
    @Prop({
        type: String,
        required: true,
        unique: true,
    })
    name: string

    @Prop({
        type: String,
        required: true,
    })
    vehiclesId: string

    @Prop({
        type: Date,
    })
    createdAt?: Date
}

export const VersionSchema = new Mongo.Schema(
    SchemaFactory.createForClass(Version),
    {
        timestamps: true,
    }
)
