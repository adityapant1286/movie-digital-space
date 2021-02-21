import axios, { AxiosResponse } from "axios";
import _ from 'lodash';

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

        return _providerCache.get(this.providersKey, 
                                () => Promise.resolve(cfg.moviesListingProviders
                                            .map((e: any) => new MovieListingProviderBuilder()
                                                        .name(e.name)
                                                        .id(e.id)
                                                        .endpoint(e.endpoint)
                                                        .resourceEndpoint(e.resourceEndpoint)
                                                        .authentication(e.authentication)
                                                        .build()
                                                )
                                )
        ).then((result: any) => result);

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

        // const movieListing : { 
        //     [key:string]: any; 
        // } = {};        
        
        return _movieListingCache.get(this.allMovieListingKey, 
                async () => {
                    const promises = await this.getProviderPromises();

                    const all = await Promise.all(promises);
                    const movieListing: any[] = [];

                    all.forEach(resp => {
                            if (resp && resp.status === 200) {
                                const pName = resp.data.Provider;
                                const movieData = resp.data.Movies.map((m: any) => {
                                    m['provider'] = pName;
                                    return m;
                                });

                                movieListing.push(movieData);

                                // movieListing[resp.data.Provider] = resp.data.Movies;
                            }
                        });

                    const merged = [].concat.apply([], movieListing);

                    return Promise.resolve(merged);

                }).then((result: any) => result);
    }

}
export default MovieListingService;