import axios from 'axios';
import jsonata from 'jsonata';
import { defer } from 'rxjs';
import { map } from 'rxjs/operators';

import { MOVIES_ENDPOINT, EXPIRE_TTL_15_MIN } from '../common/constants';
import CacheService from '../cachestore/cache.service';

const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;

const ALL_LISTING = 'all-movies-listing';

const cacheStore = new CacheService(EXPIRE_TTL_15_MIN);

// https://try.jsonata.org/bsYTnJIeE
const flattenScript = jsonata(`(
    $raw := $;

    $uniqueTitles := *.Title ~> $distinct;
    
    $flattened := $map($uniqueTitles, function($v, $i, $a) {(
        $byProvider := $raw[Title=$v];
        $idsAndProvider := {
            "id": $byProvider.ID,
            "provider": $byProvider.provider
        };

        $providers := $map($idsAndProvider.id, function($vv, $ii, $aa) {(
            {
                "id": $vv,
                "provider": $idsAndProvider.provider[$ii]
            }
        )});
        {
            "title": $byProvider.Title ~> $distinct,
            "type": $byProvider.Type ~> $distinct,
            "poster": $byProvider.Poster ~> $distinct,
            "providers": $providers
        }
    )});
)`);

const __transformData = (data) => {

    return cacheStore.get(ALL_LISTING, () => Promise.resolve(flattenScript.evaluate(data)))
                    .then((result) => result);
};

export const getListing = () => {    
    return defer(() => axios.get(BACKEND_HOST + MOVIES_ENDPOINT, 
                                { headers: { "Content-Type": "application/json"} })
            )
            .pipe(map(resp => __transformData(resp.data)));
};

