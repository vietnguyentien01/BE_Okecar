import * as Mongo from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

import { IImage } from '../../../interfaces/image'

@Schema()
export class CarCompany extends Document {
    @Prop({
        type: String,
        required: true,
        unique: true,
    })
    name: string

    @Prop({
        type: Mongo.Schema.Types.Mixed,
    })
    avatar?: IImage

    @Prop({
        type: Date,
    })
    createdAt?: Date
}

export const CarCompanySchema = new Mongo.Schema(
    SchemaFactory.createForClass(CarCompany),
    {
        timestamps: true,
    }
)
