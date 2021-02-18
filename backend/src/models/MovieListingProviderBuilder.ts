import MovieListingProvider from "./MovieListingProvider";

export default class MovieListingEndpointBuilder {

    private readonly _provider: MovieListingProvider;

    constructor() {
        this._provider = {
            name: "",
            id: "",
            endpoint: "",
            authentication: {}
        };
    }

    name(name: string): MovieListingEndpointBuilder {
        this._provider.name = name;
        return this;
    }

    id(id: any): MovieListingEndpointBuilder {
        this._provider.id = id;
        return this;
    }

    endpoint(endpoint: string): MovieListingEndpointBuilder {
        this._provider.endpoint = endpoint;
        return this;
    }

    authentication(authentication: any): MovieListingEndpointBuilder {
        this._provider.authentication = authentication;
        return this;
    }

    build(): MovieListingProvider {
        return this._provider;
    }
}