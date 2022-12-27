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
import { CarCompanyCreateDto } from './dto/car-company-create-dto'
import { CarCompanyUpdateDto } from './dto/car-company-update-dto'
import { CarCompanyEntity } from './entities/car-company.entity'

@Controller('product-company')
export class CarCompanyController {
    constructor(private readonly carCompanyService: CarCompanyService) {}

    @Post('')
    @UseGuards(AuthGuard)
    @Roles(ROLE.ADMIN)
    async createCarCompany(
        @Body() doc: CarCompanyCreateDto
    ): Promise<CarCompanyEntity> {
        const result = await this.carCompanyService.createCarCompany(doc)
        return new CarCompanyEntity(result)
    }

    @Put('/:id')
    @UseGuards(AuthGuard)
    @Roles(ROLE.ADMIN)
    async updateCarCompany(
        @Param('id') id: string,
        @Body() doc: CarCompanyUpdateDto
    ): Promise<CarCompanyEntity> {
        const result = await this.carCompanyService.updateCar(id, doc)
        return new CarCompanyEntity(result)
    }

    @Delete('/:id')
    @UseGuards(AuthGuard)
    @Roles(ROLE.ADMIN)
    async deleteCar(@Param('id') id: string) {
        await this.carCompanyService.deleteCar(id)
    }

    @Get()
    async getList(
        @Query() query: PaginationDto
    ): Promise<IListReturn<CarCompanyEntity>> {
        const args = {
            sort: { createdAt: -1 },
            pagination: query,
        }
        const results = await this.carCompanyService.getList(args)

        return {
            data: results.data.map((user) => new CarCompanyEntity(user)),
            meta: results.meta,
        }
    }
}
