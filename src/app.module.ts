import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ScheduleModule } from '@nestjs/schedule'
import { TerminusModule } from '@nestjs/terminus'
import { ThrottlerModule } from '@nestjs/throttler'

import { AuthModule } from './apis/auth/auth.module'
import { CarCompanyModule } from './apis/carCompany/car-company.module'
import { NotificationModule } from './apis/notification/notification.module'
import { OrderModule } from './apis/order/order.module'
import { ProductModule } from './apis/product/product.module'
import { SiteMapModule } from './apis/site-map/site-map.module'
import { StorageModule } from './apis/storage/storage.module'
import { CrawDataModules } from './apis/test-craw/craw-data.modules'
import { UserModule } from './apis/users/user.module'
import { AppController } from './app.controller'
import { DB } from './configs'
import { RedisCacheModule } from './frameworks/cache-service/cache.module'
import { MailModule } from './frameworks/mail-service/mail.module'

@Module({
    imports: [
        MongooseModule.forRoot(DB.DB_URL, DB.OPTION),
        ScheduleModule.forRoot(),
        TerminusModule,
        RedisCacheModule,
        UserModule,
        StorageModule,
        AuthModule,
        MailModule,
        CarCompanyModule,
        ProductModule,
        NotificationModule,
        SiteMapModule,
        CrawDataModules,
        OrderModule,
        ThrottlerModule.forRoot({
            ttl: 90,
            limit: 1,
        }),
    ],
    controllers: [AppController],
})
export class AppModule {}
