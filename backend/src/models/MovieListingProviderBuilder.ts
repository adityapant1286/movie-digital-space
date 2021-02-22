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

import MovieListingProvider from "./MovieListingProvider";

export default class MovieListingEndpointBuilder {

    private readonly _provider: MovieListingProvider;

    constructor() {
        this._provider = {
            name: "",
            id: "",
            endpoint: "",
            resourceEndpoint: "",
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

    resourceEndpoint(resourceEndpoint: string): MovieListingEndpointBuilder {
        this._provider.resourceEndpoint = resourceEndpoint;
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