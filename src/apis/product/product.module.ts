import { HttpModule, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'

import { COLLECTION } from '../../shared/constants'
import { CarCompanySchema } from '../carCompany/model/car-company.schema'
import { NotificationSchema } from '../notification/models/notification.schema'
import { UserSchema } from '../users/model/user.schema'
import { ProductSchema } from './model/product.schema'
import { ProductAdminController } from './product.admin.controller'
import { ProductController } from './product.controller'
import { ProductPublicController } from './product.public.controller'
import { ProductService } from './product.service'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: COLLECTION.PRODUCTS, schema: ProductSchema },
            { name: COLLECTION.CAR_COMPANY, schema: CarCompanySchema },
            { name: COLLECTION.USER, schema: UserSchema },
            { name: COLLECTION.NOTIFICATION, schema: NotificationSchema },
        ]),
        JwtModule.register({}),
        HttpModule,
    ],
    providers: [ProductService],
    controllers: [
        ProductController,
        ProductAdminController,
        ProductPublicController,
    ],
    exports: [ProductService],
})
export class ProductModule {}
