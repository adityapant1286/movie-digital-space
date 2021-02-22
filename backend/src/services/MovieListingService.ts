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

import axios, { AxiosResponse } from "axios";
import _ from 'lodash';

import cfg from "../../providerConfig.json";
import CacheService from "../cacheStore/CacheService";
import ProviderService from './ProviderService';
import TransformService from './TransformService';

const __movieListingCache = new CacheService(cfg.cacheExpireTime);
const __movieDetailsCache = new CacheService(cfg.cacheExpireTime);

class MovieListingService {

    private allMovieListingKey = 'allMovieListing';
    private movieDetailKeyPrefix = 'movieDetails-';
        
    private providerService: ProviderService;
    private transformService: TransformService;

    constructor() {
        this.providerService = new ProviderService();
        this.transformService = new TransformService();
    }

    private async getProviderPromises(): Promise<Promise<AxiosResponse<any>>[]> {

        const providers = await this.providerService.getProviders();
        
        return providers.map(p => axios.get(p.endpoint, { 
                                                headers: { "x-api-key": p.authentication['x-api-key'] } 
                                            })
                            );
    }

    private async getProviderDetailPromises(providers: any[]): Promise<Promise<AxiosResponse<any>>[]> {
        const providerMap = await this.providerService.getProvidersMapByName();

        return providers.map(p => axios.get(p.resourceEndpoint, {
            headers: providerMap[p.provider].authentication
        }));
    }

    public findAll(): Promise<any> {

        // const movieListing : { 
        //     [key:string]: any; 
        // } = {};        
        
        return __movieListingCache.get(this.allMovieListingKey, 
                async () => {
                    const promises = await this.getProviderPromises();                    

                    const all = await Promise.all(promises);
                    const movieListing: any[] = [];
                    const providersMap = await this.providerService.getProvidersMapByName();                    

                    all.forEach(resp => {
                            if (resp && resp.status === 200) {
                                const pName = resp.data.Provider;
                                const movieData = resp.data.Movies.map((m: any) => {
                                    m['provider'] = pName;
                                    m['resourceEndpoint'] = providersMap[pName].resourceEndpoint;
                                    return m;
                                });

                                //console.log(movieData);

                                movieListing.push(movieData);

                                // movieListing[resp.data.Provider] = resp.data.Movies;
                            }
                        });

                    const transformedData = this.transformService.transformMediaData(movieListing);
                    movieListing.length = 0;

                    return Promise.resolve(transformedData);

                });
    }

    public findDetails(movie: any): Promise<any> {
        
        //const providerMap = this.providerService.getProvidersMapByName();
        console.log(movie.title);

        return __movieDetailsCache.get(movie.title, async () => {

            const promises = await this.getProviderDetailPromises(movie.providers);
            const all = await Promise.all(promises);
            const details: any[] = [];
            all.forEach(resp => {
                if (resp && resp.status === 200) {
                    const d = resp.data;
                    d['provider'] = _.find(movie.providers, ['id', d.ID]).provider;
                    details.push(d);
                }
            });

            const detailsWithPricing = this.transformService.transformDetailsData(details);

            return Promise.resolve(detailsWithPricing);
        });
    }

}
export default MovieListingService;