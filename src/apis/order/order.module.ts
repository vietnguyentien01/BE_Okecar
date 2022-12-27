import { Global, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'

import { COLLECTION } from '../../shared/constants'
import { ProductSchema } from '../product/model/product.schema'
import { UserSchema } from '../users/model/user.schema'
import { OrderSchema } from './model/order.schema'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'

@Global()
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: COLLECTION.ORDER, schema: OrderSchema },
            { name: COLLECTION.PRODUCTS, schema: ProductSchema },
            { name: COLLECTION.USER, schema: UserSchema },
        ]),
        JwtModule.register({}),
    ],
    providers: [OrderService],
    controllers: [OrderController],
    exports: [OrderService],
})
export class OrderModule {}
