import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common'

import { AuthGuard, Roles } from '../../plugins/guards'
import { PaginationDto } from '../../shared/common/dto'
import { IListReturn } from '../../shared/common/interfaces'
import { ROLE } from '../../shared/constants'
import { CarCompanyService } from './car-company.service'
import { VehiclesCreateDto } from './dto/vehicles-create-dto'
import { VehiclesUpdateDto } from './dto/vehicles-update-dto'
import { VehiclesEntity } from './entities/vehicles.entity'

@Controller('vehicles')
export class VehiclesController {
    constructor(private readonly carCompanyService: CarCompanyService) {}

    @Post('')
    @UseGuards(AuthGuard)
    @Roles(ROLE.ADMIN)
    async create(@Body() doc: VehiclesCreateDto): Promise<VehiclesEntity> {
        const result = await this.carCompanyService.createVehicles(doc)
        return new VehiclesEntity(result)
    }

    @Put('/:id')
    @UseGuards(AuthGuard)
    @Roles(ROLE.ADMIN)
    async update(
        @Param('id') id: string,
        @Body() doc: VehiclesUpdateDto
    ): Promise<VehiclesEntity> {
        const result = await this.carCompanyService.updateVehicles(id, doc)
        return new VehiclesEntity(result)
    }

    @Delete('/:id')
    @UseGuards(AuthGuard)
    @Roles(ROLE.ADMIN)
    async delete(@Param('id') id: string) {
        await this.carCompanyService.deleteVehicles(id)
    }

    @Get('/by-product-company/:id')
    async getList(
        @Param('id') id: string,
        @Query() query: PaginationDto
    ): Promise<IListReturn<VehiclesEntity>> {
        const args = {
            sort: { createdAt: -1 },
            pagination: query,
        }
        const results = await this.carCompanyService.getListVehicles(args, id)

        return {
            data: results.data.map((vehicles) => new VehiclesEntity(vehicles)),
            meta: results.meta,
        }
    }
}
