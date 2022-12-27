"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisCacheModule = void 0;
const redisStore = require("cache-manager-redis-store");
const common_1 = require("@nestjs/common");
const configs_1 = require("../../configs");
const cache_service_1 = require("./cache.service");
let RedisCacheModule = class RedisCacheModule {
};
RedisCacheModule = __decorate([
    common_1.Global(),
    common_1.Module({
        imports: [
            common_1.CacheModule.register({
                store: redisStore,
                host: configs_1.redisConfig.host,
                port: configs_1.redisConfig.port,
                password: configs_1.redisConfig.password,
                db: configs_1.redisConfig.db,
            }),
        ],
        providers: [cache_service_1.CacheService],
        exports: [cache_service_1.CacheService],
    })
], RedisCacheModule);
exports.RedisCacheModule = RedisCacheModule;
//# sourceMappingURL=cache.module.js.map