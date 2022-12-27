"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberLimitGuard = void 0;
const common_1 = require("@nestjs/common");
const throttler_1 = require("@nestjs/throttler");
const constants_1 = require("../../shared/constants");
class MemberLimitGuard extends throttler_1.ThrottlerGuard {
    async handleRequest(context, limit, ttl) {
        const request = context.switchToHttp().getRequest();
        if (!request.body.address) {
            throw new common_1.BadRequestException(constants_1.ERROR.BODY_WAS_WRONG);
        }
        const address = request.body.address;
        const key = this.generateKey(context, address);
        const cacheTimesDuringTtl = await this.storageService.getRecord(key);
        if (cacheTimesDuringTtl.length >= limit) {
            throw new common_1.HttpException({ message: 'LIMIT_RATE' }, common_1.HttpStatus.TOO_MANY_REQUESTS);
        }
        await this.storageService.addRecord(key, ttl);
        return true;
    }
}
exports.MemberLimitGuard = MemberLimitGuard;
//# sourceMappingURL=member-login-limit.guard.js.map