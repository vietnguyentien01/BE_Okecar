import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../apis/users/model/user.schema';
import { CacheService } from '../../frameworks/cache-service/cache.service';
export declare class AuthGuard implements CanActivate {
    private readonly jwtService;
    private readonly redis;
    private reflector;
    constructor(jwtService: JwtService, redis: CacheService, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
    validateUser(token: string): Promise<User>;
}
