"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LimitGuard = void 0;
const common_1 = require("@nestjs/common");
const throttler_1 = require("@nestjs/throttler");
const constants_1 = require("../../shared/constants");
class LimitGuard extends throttler_1.ThrottlerGuard {
    async handleRequest(context, limit, ttl) {
        const request = context.switchToHttp().getRequest();
        if (!request.headers.authorization) {
            throw new common_1.ForbiddenException(constants_1.ERROR.INVALID_TOKEN);
        }
        const authorization = request.headers.authorization;
        const key = this.generateKey(context, authorization);
        const cacheTimesDuringTtl = await this.storageService.getRecord(key);
        if (cacheTimesDuringTtl.length >= limit) {
            throw new common_1.HttpException({ message: 'LIMIT_RATE' }, common_1.HttpStatus.TOO_MANY_REQUESTS);
        }
        await this.storageService.addRecord(key, ttl);
        return true;
    }
}
exports.LimitGuard = LimitGuard;
//# sourceMappingURL=limit.guard.js.map