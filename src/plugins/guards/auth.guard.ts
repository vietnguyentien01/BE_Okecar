import {
    BadRequestException,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'

import { ERROR } from 'shared/constants'

import { UserEntity } from '../../apis/users/entities/user.entity'
import { User } from '../../apis/users/model/user.schema'
import { CacheService } from '../../frameworks/cache-service/cache.service'
import { ROLES_KEY } from './role.guard'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly redis: CacheService,
        private reflector: Reflector
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const token: string = request?.headers?.authorization || undefined
        if (!token) {
            throw new BadRequestException(ERROR.TOKEN_IS_EMPTY)
        }
        const info = this.jwtService.decode(token)
        if (!info) {
            throw new UnauthorizedException(ERROR.INVALID_TOKEN)
        }

        //validate user info
        const user: User = await this.validateUser(token)
        request.user = new UserEntity(user)

        // //validate role
        const roles = this.reflector.get<string[]>(
            ROLES_KEY,
            context.getHandler()
        )
        if (!roles) return true
        const matchRoleRequire = roles.includes(request.user.role)
        if (!matchRoleRequire) {
            throw new ForbiddenException('This action require role ' + roles[0])
        }
        return true
    }

    async validateUser(token: string): Promise<User> {
        console.log(token)
        const user: User = await this.redis.get(token)
        if (!user) throw new UnauthorizedException()

        if (user.isBlocked) {
            throw new ForbiddenException(ERROR.USER_BLOCKED)
        }

        if (!user.role) {
            throw new ForbiddenException(ERROR.USER_NOT_YET_REGISTERED)
        }

        return user
    }
}
