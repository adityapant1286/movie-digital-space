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

import jsonata from 'jsonata';

export default class TransformService {

    // https://try.jsonata.org/K7zj87yPf
    private flattenMediaDataScript = jsonata(`(
        $raw := $;

        $uniqueTitles := *.Title ~> $distinct;
        
        $flattened := $map($uniqueTitles, function($v, $i, $a) {(
            $byProvider := $raw[Title=$v];
            $idsAndProvider := {
                "id": $byProvider.ID,
                "provider": $byProvider.provider,
                "resourceEndpoint": $byProvider.resourceEndpoint
            };

            $providers := $map($idsAndProvider.id, function($vv, $ii, $aa) {(
                {
                    "id": $vv,
                    "provider": $idsAndProvider.provider[$ii],
                    "resourceEndpoint": $replace($idsAndProvider.resourceEndpoint[$ii], ":id", $vv)
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


    // https://try.jsonata.org/uMWFc3CjM
    private mediaPricingScript = jsonata(`(
        $rawData := [$];
    
        {
            "details": $rawData[0],
            "pricing": $map($rawData, 
                            function($v, $i, $a) {
                                { "provider": $v.provider, "price": $v.Price }
                            }
                        )
        };
    )`);

    constructor() {}

    public transformMediaData(mediaData: any[]): any[] {
        const merged = [].concat.apply([], mediaData);
        return this.flattenMediaDataScript.evaluate(merged);
    }

    public transformDetailsData(details: any[]): { details: any, pricing: any[] } {
        return this.mediaPricingScript.evaluate(details);
    }
}