import NodeCache, { Key } from "node-cache";

class CacheService {

    private cache : NodeCache;

    constructor(ttlSeconds: number) {

        this.cache = new NodeCache({
            stdTTL: ttlSeconds,
            checkperiod: ttlSeconds - 5,
            deleteOnExpire: true,
            useClones: false
        });
    }

    public get(key: Key, storeFunction: Function) {
        const value = this.cache.get(key);

        if (value) {
            return Promise.resolve(value);
        }

        return storeFunction().then((result: any) => {
            this.cache.set(key, result);
            return result;
        });
    }

    public del(keys: Key[]) : void {
        this.cache.del(keys);
    }

    public delStartWith(startWith = '') : void {
        if (!startWith) { 
            return; 
        }

        const keys = this.cache.keys()
            .filter((k) => k.indexOf(startWith) === 0);

        this.del(keys);
    }

    public flush() : void {
        this.cache.flushAll();
    }

    public stats() : NodeCache.Stats {
        return this.cache.getStats();
    }
}

export default CacheService;