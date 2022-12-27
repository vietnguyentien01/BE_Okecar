import {
    Body,
    Controller,
    Get,
    Param,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common'

import { AuthGuard, Roles } from '../../plugins/guards'
import { PaginationDto } from '../../shared/common/dto'
import { ROLE, STATUS } from '../../shared/constants'
import { ProductEntity } from './entites/product.entity'
import { ProductService } from './product.service'

@Controller('admin/products')
@UseGuards(AuthGuard)
@Roles(ROLE.ADMIN)
export class ProductAdminController {
    constructor(private productService: ProductService) {}

    @Get()
    async getList(
        @Query() query: PaginationDto,
        @Query('status') status: string
    ) {
        const args = {
            sort: { createdAt: -1 },
            pagination: query,
        }
        const results = await this.productService.getList(args, {
            status,
        })

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
