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
import { VersionCreateDto } from './dto/version-create-dto'
import { VersionUpdateDto } from './dto/version-update-dto'
import { VersionEntity } from './entities/version.entity'

@Controller('version')
export class VersionController {
    constructor(private readonly carCompanyService: CarCompanyService) {}

    @Post('')
    @UseGuards(AuthGuard)
    @Roles(ROLE.ADMIN)
    async create(@Body() doc: VersionCreateDto): Promise<VersionEntity> {
        const result = await this.carCompanyService.createVersion(doc)
        return new VersionEntity(result)
    }

    @Put('/:id')
    @UseGuards(AuthGuard)
    @Roles(ROLE.ADMIN)
    async update(
        @Param('id') id: string,
        @Body() doc: VersionUpdateDto
    ): Promise<VersionEntity> {
        const result = await this.carCompanyService.updateVersion(id, doc)
        return new VersionEntity(result)
    }

    @Delete('/:id')
    @UseGuards(AuthGuard)
    @Roles(ROLE.ADMIN)
    async delete(@Param('id') id: string) {
        await this.carCompanyService.deleteVehicles(id)
    }

    @Get('/by-vehicles/:id')
    async getList(
        @Param('id') id: string,
        @Query() query: PaginationDto
    ): Promise<IListReturn<VersionEntity>> {
        const args = {
            sort: { createdAt: -1 },
            pagination: query,
        }
        const results = await this.carCompanyService.getListVersion(args, id)

        return {
            data: results.data.map((version) => new VersionEntity(version)),
            meta: results.meta,
        }
    }
}
