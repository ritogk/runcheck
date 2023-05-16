<?php

use Illuminate\Database\Seeder;
use App\Model\OperationLog;
use App\OpenAPI\Model\OperationCd;

class OperationLogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        OperationLog::create([
            'operation_cd' => OperationCd::NUMBER_OPEN_MODAL_CLICK,
            'operation_nm' => 'OPEN_MODAL_CLICK',
            'execution_cnt' => 0
        ]);
        OperationLog::create([
            'operation_cd' => OperationCd::NUMBER_OPEN_CLICK,
            'operation_nm' => 'OPEN_CLICK',
            'execution_cnt' => 0
        ]);
        OperationLog::create([
            'operation_cd' => OperationCd::NUMBER_SAVE_MODAL_CLICK,
            'operation_nm' => 'SAVE_MODAL_CLICK',
            'execution_cnt' => 0
        ]);
        OperationLog::create([
            'operation_cd' => OperationCd::NUMBER_SAVE_CLICK,
            'operation_nm' => 'SAVE_CLICK',
            'execution_cnt' => 0
        ]);
        OperationLog::create([
            'operation_cd' => OperationCd::NUMBER_SYNC_RUN_CLICK,
            'operation_nm' => 'SYNC_RUN_CLICK',
            'execution_cnt' => 0
        ]);
        OperationLog::create([
            'operation_cd' => OperationCd::NUMBER_SYNC_STOP_CLICK,
            'operation_nm' => 'SYNC_STOP_CLICK',
            'execution_cnt' => 0
        ]);
        OperationLog::create([
            'operation_cd' => OperationCd::NUMBER_SYNC_SHARE_CLICK,
            'operation_nm' => 'SYNC_SHARE_CLICK',
            'execution_cnt' => 0
        ]);
        OperationLog::create([
            'operation_cd' => OperationCd::NUMBER_PLAYER_ONE_URL_ENTER,
            'operation_nm' => 'PLAYER_ONE_URL_ENTER',
            'execution_cnt' => 0
        ]);
        OperationLog::create([
            'operation_cd' => OperationCd::NUMBER_PLAYER_ONE_YOUTUBE_SEARCH_CLICK,
            'operation_nm' => 'PLAYER_ONE_YOUTUBE_SEARCH_CLICK',
            'execution_cnt' => 0
        ]);
        OperationLog::create([
            'operation_cd' => OperationCd::NUMBER_PLAYER_ONE_LOCAL_SELECT,
            'operation_nm' => 'PLAYER_ONE_LOCAL_SELECT',
            'execution_cnt' => 0
        ]);
        OperationLog::create([
            'operation_cd' => OperationCd::NUMBER_PLAYER_TWO_URL_ENTER,
            'operation_nm' => 'PLAYER_TWO_URL_ENTER',
            'execution_cnt' => 0
        ]);
        OperationLog::create([
            'operation_cd' => OperationCd::NUMBER_PLAYER_TWO_YOUTUBE_SEARCH_CLICK,
            'operation_nm' => 'PLAYER_TWO_YOUTUBE_SEARCH_CLICK',
            'execution_cnt' => 0
        ]);
        OperationLog::create([
            'operation_cd' => OperationCd::NUMBER_PLAYER_TWO_LOCAL_SELECT,
            'operation_nm' => 'PLAYER_TWO_LOCAL_SELECT',
            'execution_cnt' => 0
        ]);
        OperationLog::create([
            'operation_cd' => OperationCd::NUMBER_YOUTUBE_OAUTH_CLICK,
            'operation_nm' => 'YOUTUBE_OAUTH_CLICK',
            'execution_cnt' => 0
        ]);
        OperationLog::create([
            'operation_cd' => OperationCd::NUMBER_YOUTUBE_SELECT,
            'operation_nm' => 'YOUTUBE_SELECT',
            'execution_cnt' => 0
        ]);
        OperationLog::create([
            'operation_cd' => OperationCd::NUMBER_NAV_HOME_CLICK,
            'operation_nm' => 'NAV_HOME_CLICK',
            'execution_cnt' => 0
        ]);
        OperationLog::create([
            'operation_cd' => OperationCd::NUMBER_NAV_LOGIN_CLICK,
            'operation_nm' => 'NAV_LOGIN_CLICK',
            'execution_cnt' => 0
        ]);
        OperationLog::create([
            'operation_cd' => OperationCd::NUMBER_NAV_LOGOUT_CLICK,
            'operation_nm' => 'NAV_LOGOUT_CLICK',
            'execution_cnt' => 0
        ]);
        OperationLog::create([
            'operation_cd' => OperationCd::NUMBER_NAV_REGISTER_CLICK,
            'operation_nm' => 'NAV_REGISTER_CLICK',
            'execution_cnt' => 0
        ]);
        OperationLog::create([
            'operation_cd' => OperationCd::NUMBER_NAV_ABOUT_APP_CLICK,
            'operation_nm' => 'NAV_ABOUT_APP_CLICK',
            'execution_cnt' => 0
        ]);
        OperationLog::create([
            'operation_cd' => OperationCd::NUMBER_NAV_INQUIRY,
            'operation_nm' => 'NAV_INQUIRY',
            'execution_cnt' => 0
        ]);
        OperationLog::create([
            'operation_cd' => OperationCd::NUMBER_HOME_OPEN_CLICK,
            'operation_nm' => 'HOME_OPEN_CLICK',
            'execution_cnt' => 0
        ]);
        OperationLog::create([
            'operation_cd' => OperationCd::NUMBER_HOME_DELETE_CLICK,
            'operation_nm' => 'HOME_DELETE_CLICK',
            'execution_cnt' => 0
        ]);
    }
}
