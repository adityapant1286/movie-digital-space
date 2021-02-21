import NodeCache from "node-cache";

class CacheService {    

    constructor(ttlSeconds) {

        this.cache = new NodeCache({
            stdTTL: ttlSeconds,
            checkperiod: ttlSeconds - 5,
            deleteOnExpire: true,
            useClones: false
        });
    }

    get(key, storeFunction) {
        const value = this.cache.get(key);

        if (value) {
            return Promise.resolve(value);
        }

        return storeFunction().then(result => {
            this.cache.set(key, result);
            return result;
        });
    }

    del(keys) {
        this.cache.del(keys);
    }

    delStartWith(startWith = '') {
        if (!startWith) { 
            return; 
        }

        const keys = this.cache.keys()
            .filter(k => k.indexOf(startWith) === 0);

        this.del(keys);
    }

    flush() {
        this.cache.flushAll();
    }

    stats() {
        return this.cache.getStats();
    }
}

export default CacheService;