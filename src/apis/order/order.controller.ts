import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Query,
    Request,
    UseGuards,
} from '@nestjs/common'

import { AuthGuard } from '../../plugins/guards'
import { PaginationDto } from '../../shared/common/dto'
import { RequestInfoType } from '../../shared/common/types'
import { OrderDto } from './dto/order.dto'
import { OrderService } from './order.service'

@Controller('order')
@UseGuards(AuthGuard)
export class OrderController {
    constructor(private orderService: OrderService) {}

    @Post('/create/:productId')
    async createOrder(
        @Param('productId') productId: string,
        @Body() doc: OrderDto,
        @Request() ctx: RequestInfoType
    ) {
        await this.orderService.createOrder(ctx.user.id, productId, doc)
    }

    @Get('/page')
    async getList(
        @Query() query: PaginationDto,
        @Query('buyerId') buyerId: string,
        @Query('sellerId') sellerId: string,
        @Query('status') status: string
    ) {
        const args = {
            sort: { createdAt: -1 },
            pagination: query,
        }
        const options = {}
        buyerId && Object.assign(options, { buyerId: buyerId })
        sellerId && Object.assign(options, { sellerId: sellerId })
        status && Object.assign(options, { status: status })
        const results = await this.orderService.getList(args, options)

        return {
            data: results.data.map((product) => product),
            meta: results.meta,
        }
    }

    @Post('/confirm-order/:id')
    async confirmOrder(
        @Param('id') id: string,
        @Request() ctx: RequestInfoType
    ) {
        await this.orderService.confirmOrder(id, ctx.user.id)
    }

    @Post('/cancel-order/:id')
    async cancelOrder(
        @Param('id') id: string,
        @Request() ctx: RequestInfoType
    ) {
        await this.orderService.cancelOrder(id, ctx.user.id)
    }
}
