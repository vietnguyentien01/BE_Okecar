import { Controller, Get, Param, Query } from '@nestjs/common'

import { PaginationDto } from '../../shared/common/dto'
import { ProductService } from './product.service'

@Controller('public/products')
export class ProductPublicController {
    constructor(private productService: ProductService) {}

    @Get()
    async getList(
        @Query() query: PaginationDto,
        @Query('carStatus') carStatus: string,
        @Query('origin') origin: string,
        @Query('carCompanyId') carCompanyId: string,
        @Query('vehiclesId') vehiclesId: string,
        @Query('keyword') keyword: string,
        @Query('status') status: string
    ) {
        const args = {
            sort: { createdAt: -1 },
            pagination: query,
        }
        const options = {}
        carStatus && Object.assign(options, { carStatus: carStatus })
        origin && Object.assign(options, { origin: origin })
        carCompanyId && Object.assign(options, { carCompanyId: carCompanyId })
        vehiclesId && Object.assign(options, { vehiclesId: vehiclesId })
        keyword && Object.assign(options, { keyword: keyword })
        status && Object.assign(options, { status: status })
        const results = await this.productService.getList(args, options)

        return {
            data: results.data.map((product) => product),
            meta: results.meta,
        }
    }

    @Get('/:id')
    async getOne(@Param('id') id: string) {
        return await this.productService.getOne(id)
    }
}
