import { HttpModule, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'

import { COLLECTION } from '../../shared/constants'
import { CrawDataController } from './craw-data.controller'
import { ScrapperService } from './craw-data.service'
import { CrawModelSchema } from './models/craw-model'

@Module({
    imports: [
        JwtModule.register({}),
        HttpModule,
        MongooseModule.forFeature([
            { name: COLLECTION.CRAW, schema: CrawModelSchema },
        ]),
    ],
    controllers: [CrawDataController],
    exports: [ScrapperService],
    providers: [ScrapperService],
})
export class CrawDataModules {}
