/* 
    Copyright (C) 2021  
    Author: Aditya Pant
    Email: aditya.java6@gmail.com

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.

*/

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