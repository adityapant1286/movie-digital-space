
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