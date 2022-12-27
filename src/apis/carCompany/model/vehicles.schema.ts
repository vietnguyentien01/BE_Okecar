import * as Mongo from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'


@Schema()
export class Vehicles extends Document {
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
    carCompanyId: string

    @Prop({
        type: Date,
    })
    createdAt?: Date
}

export const VehiclesSchema = new Mongo.Schema(
    SchemaFactory.createForClass(Vehicles),
    {
        timestamps: true,
    }
)
