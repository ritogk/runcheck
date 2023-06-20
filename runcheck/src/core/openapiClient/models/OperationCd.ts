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

/**
 * 
 * @export
 * @enum {string}
 */
export enum OperationCd {
    OPEN_MODAL_CLICK = 1,
    OPEN_CLICK = 2,
    SAVE_MODAL_CLICK = 3,
    SAVE_CLICK = 4,
    SYNC_RUN_CLICK = 5,
    SYNC_STOP_CLICK = 6,
    SYNC_SHARE_CLICK = 7,
    PLAYER_ONE_URL_ENTER = 8,
    PLAYER_ONE_YOUTUBE_SEARCH_CLICK = 9,
    PLAYER_ONE_LOCAL_SELECT = 10,
    PLAYER_TWO_URL_ENTER = 11,
    PLAYER_TWO_YOUTUBE_SEARCH_CLICK = 12,
    PLAYER_TWO_LOCAL_SELECT = 13,
    YOUTUBE_OAUTH_CLICK = 14,
    YOUTUBE_SELECT = 15,
    NAV_HOME_CLICK = 16,
    NAV_LOGIN_CLICK = 17,
    NAV_LOGOUT_CLICK = 18,
    NAV_REGISTER_CLICK = 19,
    NAV_ABOUT_APP_CLICK = 20,
    NAV_INQUIRY = 21,
    HOME_OPEN_CLICK = 22,
    HOME_DELETE_CLICK = 23,
    REGISTER_CLICK = 24,
    LOGIN_CLICK = 25,
    SYNC_CONTROLLER_SWITCH_PLAY_CLICK = 26,
    SYNC_CONTROLLER_SWITCH_REPEAT_CLICK = 27,
    SYNC_CONTROLLER_SPEED_CLICK = 28,
    SYNC_CONTROLLER_RELOAD_CLICK = 29,
    SYNC_CONTROLLER_SWITCH_MUTE_CLICK = 30
}

export function OperationCdFromJSON(json: any): OperationCd {
    return OperationCdFromJSONTyped(json, false);
}

export function OperationCdFromJSONTyped(json: any, ignoreDiscriminator: boolean): OperationCd {
    return json as OperationCd;
}

export function OperationCdToJSON(value?: OperationCd | null): any {
    return value as any;
}

