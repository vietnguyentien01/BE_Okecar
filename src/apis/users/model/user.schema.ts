import * as Mongo from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

import { IImage } from 'interfaces/image'
import { IStore } from 'interfaces/user.interface'
import { ROLE } from 'shared/constants'

@Schema()
export class User extends Document {
    @Prop({
        type: String,
        required: true,
        unique: true,
    })
    phone: string

    @Prop({
        type: String,
        required: true,
        unique: true,
    })
    email: string

    @Prop({
        type: String,
    })
    userName?: string

    @Prop({
        type: String,
    })
    fullName?: string

    @Prop({
        type: String,
    })
    address?: string

    @Prop({
        type: Number,
    })
    birthday?: number

    @Prop({
        type: String,
    })
    password: string

    @Prop({
        type: Boolean,
        default: false,
    })
    isBlocked: boolean

    @Prop({
        type: Mongo.Schema.Types.Mixed,
    })
    avatar?: IImage

    @Prop({
        type: Mongo.Schema.Types.Mixed,
    })
    storeInfo?: IStore

    @Prop({
        type: String,
        enum: Object.values(ROLE),
        default: ROLE.NORMAL,
    })
    role: ROLE

    @Prop({
        type: Date,
    })
    createdAt?: Date
}

export const UserSchema = new Mongo.Schema(SchemaFactory.createForClass(User), {
    timestamps: true,
})
