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

import cfg from "../../providerConfig.json";
import CacheService from "../cacheStore/CacheService";
import MovieListingProvider from "../models/MovieListingProvider";
import MovieListingProviderBuilder from "../models/MovieListingProviderBuilder";

const _providerCache = new CacheService(86400); // 24 hours


class ProviderService {
    private providersKey = 'providers';
    private providersMapKey = 'providersMap';

    constructor() { }

    private findProviders(): Promise<any[]> {

        const providersFromDB = cfg.moviesListingProviders;

        return _providerCache.get(this.providersKey, () => Promise.resolve(providersFromDB));

    }

    public async getProvidersMapByName(): Promise<{ [key:string]: MovieListingProvider; }> {
        const providers = await this.getProviders();
        const pMap: { 
                [key:string]: MovieListingProvider;
            } = {};
        providers.forEach(p => {
            pMap[p.name] = p;
        });

        return _providerCache.get(this.providersMapKey, () => Promise.resolve(pMap));
    }

    public getProviders(): Promise<MovieListingProvider[]> {
        
        return this.findProviders()
                    .then((found: any[]) => 
                        found.map((e: any) => new MovieListingProviderBuilder()
                                                        .name(e.name)
                                                        .id(e.id)
                                                        .endpoint(e.endpoint)
                                                        .resourceEndpoint(e.resourceEndpoint)
                                                        .authentication(e.authentication)
                                                        .build())
                    );
    }

}

export default ProviderService;