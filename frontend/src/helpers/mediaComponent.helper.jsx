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
    // console.log('---------------');
    // console.log(title);
    // console.log(data);

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