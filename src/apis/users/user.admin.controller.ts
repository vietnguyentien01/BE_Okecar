import {
    Body,
    Controller,
    Get,
    Param,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common'

import { AuthGuard, Roles } from 'plugins/guards'
import { ROLE } from 'shared/constants'

import { PaginationDto } from '../../shared/common/dto'
import { IListReturn } from '../../shared/common/interfaces'
import { AdminUpdateDto } from './dto/admin-update-dto'
import { UserEntity } from './entities/user.entity'
import { UserService } from './user.service'

@Controller('/admin/users')
@UseGuards(AuthGuard)
@Roles(ROLE.ADMIN)
export class UserAdminController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getListUserByAdmin(
        @Query() query: PaginationDto
    ): Promise<IListReturn<UserEntity>> {
        const args = {
            sort: { createdAt: -1 },
            pagination: query,
        }
        const results = await this.userService.getListUser(args)

        return {
            data: results.data.map((user) => new UserEntity(user)),
            meta: results.meta,
        }
    }

    @Put('/:id')
    async updateOne(
        @Param('id') id: string,
        @Body() doc: AdminUpdateDto
    ): Promise<UserEntity> {
        const result = await this.userService.updateOne(id, doc)
        return new UserEntity(result)
    }
}
