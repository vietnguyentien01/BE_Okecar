import { HttpModule, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'

import { COLLECTION } from 'shared/constants'

import { UserSchema } from '../users/model/user.schema'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: COLLECTION.USER, schema: UserSchema },
        ]),
        JwtModule.register({
            secret: 'secret',
            signOptions: { expiresIn: '60s' },
        }),

        HttpModule,
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}
