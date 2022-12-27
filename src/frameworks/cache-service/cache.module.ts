import * as redisStore from 'cache-manager-redis-store'
import { CacheModule, Global, Module } from '@nestjs/common'
import { redisConfig } from 'configs'

import { CacheService } from './cache.service'

@Global()
@Module({
    imports: [
        CacheModule.register({
            store: redisStore,
            host: redisConfig.host,
            port: redisConfig.port,
            password: redisConfig.password,
            db: redisConfig.db,
        }),
    ],
    providers: [CacheService],
    exports: [CacheService],
})
export class RedisCacheModule {}
