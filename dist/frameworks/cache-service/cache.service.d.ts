import { Store } from 'cache-manager';
export declare class CacheService {
    private readonly cache;
    constructor(cache: Store);
    get(key: string): Promise<any>;
    set(key: string, value: any, ttl?: number): Promise<void>;
    del(key: string): Promise<void>;
}
