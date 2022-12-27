"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const constants_1 = require("../../shared/constants");
const user_entity_1 = require("../../apis/users/entities/user.entity");
const cache_service_1 = require("../../frameworks/cache-service/cache.service");
const role_guard_1 = require("./role.guard");
let AuthGuard = class AuthGuard {
    constructor(jwtService, redis, reflector) {
        this.jwtService = jwtService;
        this.redis = redis;
        this.reflector = reflector;
    }
    async canActivate(context) {
        var _a;
        const request = context.switchToHttp().getRequest();
        const token = ((_a = request === null || request === void 0 ? void 0 : request.headers) === null || _a === void 0 ? void 0 : _a.authorization) || undefined;
        if (!token) {
            throw new common_1.BadRequestException(constants_1.ERROR.TOKEN_IS_EMPTY);
        }
        const info = this.jwtService.decode(token);
        if (!info) {
            throw new common_1.UnauthorizedException(constants_1.ERROR.INVALID_TOKEN);
        }
        const user = await this.validateUser(token);
        request.user = new user_entity_1.UserEntity(user);
        const roles = this.reflector.get(role_guard_1.ROLES_KEY, context.getHandler());
        if (!roles)
            return true;
        const matchRoleRequire = roles.includes(request.user.role);
        if (!matchRoleRequire) {
            throw new common_1.ForbiddenException('This action require role ' + roles[0]);
        }
        return true;
    }
    async validateUser(token) {
        console.log(token);
        const user = await this.redis.get(token);
        if (!user)
            throw new common_1.UnauthorizedException();
        if (user.isBlocked) {
            throw new common_1.ForbiddenException(constants_1.ERROR.USER_BLOCKED);
        }
        if (!user.role) {
            throw new common_1.ForbiddenException(constants_1.ERROR.USER_NOT_YET_REGISTERED);
        }
        return user;
    }
};
AuthGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        cache_service_1.CacheService,
        core_1.Reflector])
], AuthGuard);
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map