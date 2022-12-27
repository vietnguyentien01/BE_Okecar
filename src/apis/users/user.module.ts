import { HttpModule, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'

import { COLLECTION } from 'shared/constants'

import { UserSchema } from './model/user.schema'
import { UserAdminController } from './user.admin.controller'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: COLLECTION.USER, schema: UserSchema },
        ]),
        JwtModule.register({}),
        HttpModule,
    ],
    providers: [UserService],
    controllers: [UserController, UserAdminController],
    exports: [UserService],
})
export class UserModule {}
