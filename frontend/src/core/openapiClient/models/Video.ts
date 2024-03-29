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
import {
    VideoType,
    VideoTypeFromJSON,
    VideoTypeFromJSONTyped,
    VideoTypeToJSON,
} from './';

/**
 * 動画情報
 * @export
 * @interface Video
 */
export interface Video {
    /**
     * 
     * @type {string}
     * @memberof Video
     */
    url: string;
    /**
     * 
     * @type {string}
     * @memberof Video
     */
    timeSt: string;
    /**
     * 
     * @type {VideoType}
     * @memberof Video
     */
    videoType: VideoType;
}

export function VideoFromJSON(json: any): Video {
    return VideoFromJSONTyped(json, false);
}

export function VideoFromJSONTyped(json: any, ignoreDiscriminator: boolean): Video {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'url': json['url'],
        'timeSt': json['timeSt'],
        'videoType': VideoTypeFromJSON(json['videoType']),
    };
}

export function VideoToJSON(value?: Video | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'url': value.url,
        'timeSt': value.timeSt,
        'videoType': VideoTypeToJSON(value.videoType),
    };
}

