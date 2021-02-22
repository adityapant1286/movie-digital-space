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