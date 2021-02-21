import axios from 'axios';
import { defer } from 'rxjs';
import { map } from 'rxjs/operators';
import _ from 'lodash';


import { MOVIES_ENDPOINT, MOVIE_DETAILS_ENDPOINT } from '../common/constants';

const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;

export const getListing = () => {

    return defer(
                () => axios.get(BACKEND_HOST + MOVIES_ENDPOINT, { headers: { "Content-Type": "application/json"} })
            ).pipe(map(resp => resp.data));
};

export const getMediaDetails = (title, data) => {

    return defer(
        () => axios.post(BACKEND_HOST + MOVIE_DETAILS_ENDPOINT, {
                title: title,
                providers: data
            }
        )
    ).pipe(map(resp => resp.data));
};

export const getLowestPrice = (pricingByProvider) => { 
    return _.minBy(pricingByProvider, p => p.price); 
};