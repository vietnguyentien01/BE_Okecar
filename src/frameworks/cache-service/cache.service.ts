import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common'
import { Store } from 'cache-manager'

@Injectable()
export class CacheService {
    constructor(@Inject(CACHE_MANAGER) private readonly cache: Store) {}

    async get(key: string): Promise<any> {
        return await this.cache.get(key)
    }

    async set(key: string, value: any, ttl = 0) {
        await this.cache.set(key, value, { ttl })
    }

    async del(key: string) {
        await this.cache.del(key)
    }
}
