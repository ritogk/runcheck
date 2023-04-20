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
            'operation_cd' => OperationCd::NUMBER_ENABLE_SENSOR,
            'operation_nm' => '「センサーを有効にする」',
            'execution_cnt' => 0
        ]);
        OperationLog::create([
            'operation_cd' => OperationCd::NUMBER_CALIBRATION,
            'operation_nm' => '「キャリブレーション」',
            'execution_cnt' => 0
        ]);
        OperationLog::create([
            'operation_cd' => OperationCd::NUMBER_CALIBRATION_BEFORE_SETTING,
            'operation_nm' => '「直前設定を使う」',
            'execution_cnt' => 0
        ]);
        OperationLog::create([
            'operation_cd' => OperationCd::NUMBER_CALIBRATION_NEXT_1,
            'operation_nm' => '「キャリブレーション 次へ1」',
            'execution_cnt' => 0
        ]);
        OperationLog::create([
            'operation_cd' => OperationCd::NUMBER_CALIBRATION_NEXT_2,
            'operation_nm' => '「キャリブレーション 次へ2」',
            'execution_cnt' => 0
        ]);
        OperationLog::create([
            'operation_cd' => OperationCd::NUMBER_MAX_14_G,
            'operation_nm' => '「Max1.4G」',
            'execution_cnt' => 0
        ]);
        OperationLog::create([
            'operation_cd' => OperationCd::NUMBER_MAX_10_G,
            'operation_nm' => '「Max1.0G」',
            'execution_cnt' => 0
        ]);
        OperationLog::create([
            'operation_cd' => OperationCd::NUMBER_VOICE_OUTPUT_ON,
            'operation_nm' => '「音声出力ON」',
            'execution_cnt' => 0
        ]);
        OperationLog::create([
            'operation_cd' => OperationCd::NUMBER_VOICE_OUTPUT_OFF,
            'operation_nm' => '「音声出力OFF」',
            'execution_cnt' => 0
        ]);
        OperationLog::create([
            'operation_cd' => OperationCd::NUMBER_GBOWL,
            'operation_nm' => '「GBowl」',
            'execution_cnt' => 0
        ]);
        OperationLog::create([
            'operation_cd' => OperationCd::NUMBER_GINDICATOR,
            'operation_nm' => '「GIndicator」',
            'execution_cnt' => 0
        ]);
    }
}
