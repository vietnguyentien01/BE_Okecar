import {
    Body,
    Controller,
    Get,
    Post,
    Put,
    Request,
    UseGuards,
} from '@nestjs/common'

import { AuthGuard, Roles } from 'plugins/guards'

import { RequestInfoType } from '../../shared/common/types'
import { ROLE } from '../../shared/constants'
import { StoreDto } from '../auth/dto/store-input'
import { StoreUpdateDto } from './dto/store-update'
import { UserUpdateDto } from './dto/user-update'
import { UserEntity } from './entities/user.entity'
import { User } from './model/user.schema'
import { UserService } from './user.service'

@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/me')
    async getUser(@Request() ctx: RequestInfoType): Promise<UserEntity> {
        const result = await this.userService.getOne({ _id: ctx.user.id })
        return new UserEntity(result)
    }

    @Put('/me')
    async updateMyAccount(
        @Request() ctx: RequestInfoType,
        @Body() doc: UserUpdateDto
    ): Promise<UserEntity> {
        const user: User = await this.userService.updateUser(ctx.user.id, doc)
        return new UserEntity(user)
    }

    @Post('/register-store')
    async registerStore(
        @Request() ctx: RequestInfoType,
        @Body() doc: StoreDto
    ): Promise<UserEntity> {
        const user: User = await this.userService.registerToStore(
            ctx.user.id,
            doc
        )
        return new UserEntity(user)
    }

    @Put('/register-store')
    async updateStore(
        @Request() ctx: RequestInfoType,
        @Body() doc: StoreUpdateDto
    ): Promise<UserEntity> {
        const user: User = await this.userService.updateStore(ctx.user.id, doc)
        return new UserEntity(user)
    }
}
