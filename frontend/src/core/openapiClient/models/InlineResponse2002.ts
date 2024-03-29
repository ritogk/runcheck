/* tslint:disable */
/* eslint-disable */
/**
 * OpenAPI Tutorial
 * OpenAPI Tutorial by halhorn
 *
 * The version of the OpenAPI document: 0.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface InlineResponse2002
 */
export interface InlineResponse2002 {
    /**
     * 認可画面のリダイレクト用URL
     * @type {string}
     * @memberof InlineResponse2002
     */
    redirectUrl: string;
}

export function InlineResponse2002FromJSON(json: any): InlineResponse2002 {
    return InlineResponse2002FromJSONTyped(json, false);
}

export function InlineResponse2002FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse2002 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'redirectUrl': json['redirectUrl'],
    };
}

export function InlineResponse2002ToJSON(value?: InlineResponse2002 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'redirectUrl': value.redirectUrl,
    };
}

