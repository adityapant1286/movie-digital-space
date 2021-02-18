import axios, { AxiosResponse } from "axios";
import { json } from "express";

import cfg from "../../config.json";
import CacheService from "../cacheStore/CacheService";
import MovieListingProvider from "../models/MovieListingProvider";
import MovieListingProviderBuilder from "../models/MovieListingProviderBuilder";

const _movieListingCache = new CacheService(cfg.cacheExpireTime);
const _providerCache = new CacheService(86400); // 24 hours

class MovieListingService {

    private providersKey = 'providers';
    private allMovieListingKey = 'allMovieListing';

    constructor() {
    }

    private getProviders(): Promise<MovieListingProvider[]> {

        const providers = _providerCache.get(this.providersKey, 
                                () => Promise.resolve(cfg.moviesListingProviders)
                            ).then((result: any) => result);


        return providers.then((res: any[]) => 
                    res.map((e: any) => new MovieListingProviderBuilder()
                                            .name(e.name)
                                            .id(e.id)
                                            .endpoint(e.endpoint)
                                            .authentication(e.authentication)
                                            .build()
                    )
                );
    }

    private async getProviderPromises() {
        
        const providers = await this.getProviders();
        return providers.map(p => axios.get(p.endpoint, {
                                        headers: {
                                            "x-api-key": p.authentication['x-api-key']
                                        }
                                    })
                );
    }

    public findAll(): Promise<any> {

        const movieListing : { 
            [key:string]: any; 
        } = {};
        
        return _movieListingCache.get(this.allMovieListingKey, 
                async () => {
                    const promises = await this.getProviderPromises();

                    const all = await Promise.all(promises);

                    all.forEach(resp => {
                            if (resp && resp.status === 200) {
                                movieListing[resp.data.Provider] = resp.data.Movies;
                            }
                        });

                    return Promise.resolve(movieListing);

                }).then((result: any) => result);
    }

}
export default MovieListingService;