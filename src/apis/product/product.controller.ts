import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Query,
    Request,
    UseGuards,
} from '@nestjs/common'

import { AuthGuard } from '../../plugins/guards'
import { PaginationDto } from '../../shared/common/dto'
import { RequestInfoType } from '../../shared/common/types'
import { STATUS } from '../../shared/constants'
import { ProductCreateDto } from './dto/product-create.dto'
import { ProductEntity } from './entites/product.entity'
import { ProductService } from './product.service'

@Controller('products')
@UseGuards(AuthGuard)
export class ProductController {
    constructor(private productService: ProductService) {}

    @Post()
    async createProduct(
        @Body() doc: ProductCreateDto,
        @Request() ctx: RequestInfoType
    ) {
        await this.productService.createProduct(doc, ctx.user.id)
    }

    @Get('/me')
    async getList(
        @Query() query: PaginationDto,
        @Request() ctx: RequestInfoType,
        @Query('status') status: string
    ) {
        const args = {
            sort: { createdAt: -1 },
            pagination: query,
        }
        const options = {}
        status && Object.assign(options, { status: status })
        ctx.user.id && Object.assign(options, { userId: ctx.user.id })

        const results = await this.productService.getList(args, options)

        return {
            data: results.data.map((product) => product),
            meta: results.meta,
        }
    }

    @Put('/confirm-status/:id')
    async confirmStatus(
        @Param('id') id: string,
        @Body('status') status: STATUS
    ): Promise<ProductEntity> {
        const product = await this.productService.updateProductStatus(
            id,
            status
        )
        return new ProductEntity(product)
    }
}
