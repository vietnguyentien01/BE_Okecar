import { Global, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'

import { COLLECTION } from 'shared/constants'

import { AwsS3Service } from '../../frameworks/aws-s3-service/aws-s3.service'
import { FileSchema } from './model/file.schema'
import { StorageController } from './storage.controller'
import { StorageService } from './storage.service'

@Global()
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: COLLECTION.FILE, schema: FileSchema },
        ]),
        JwtModule.register({}),
    ],
    providers: [StorageService, AwsS3Service],
    controllers: [StorageController],
    exports: [StorageService, AwsS3Service],
})
export class StorageModule {}
