import { Global, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'

import { COLLECTION } from 'shared/constants'

import { UserSchema } from '../users/model/user.schema'
import { NotificationSchema } from './models/notification.schema'
import { NotificationController } from './notification.controller'
import { NotificationService } from './notification.service'

@Global()
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: COLLECTION.USER, schema: UserSchema },
            { name: COLLECTION.NOTIFICATION, schema: NotificationSchema },
        ]),
        JwtModule.register({}),
    ],
    providers: [NotificationService],
    controllers: [NotificationController],
    exports: [NotificationService],
})
export class NotificationModule {}
