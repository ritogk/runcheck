@extends('layouts.app')

@section('content')
     <div class="title">比較対象[Youtube - Youtube]</div>
     <div id="container" style="margin-left: 0px;margin-right: 0px;">
        <div id='memoPanel' style="display: none;">
           <div id='captionMemo'>動画詳細</div>
           <span id="title_disp"></span><br>
           <span id="memo_disp"></span>
        </div>
        
        <div id='buttonMulti'>
           <div id='captionMulti'>同時制御</div>
           <div>
              <button class="btn btn-outline-dark button-style" style="background-color: #ebffe7" id="multiSet" onclick="btnClick_MultiSet()">セット</button>
              <button class="btn btn-outline-dark button-style" style="background-color: #ebffe7" id="multiReload" onclick="btnClick_MultiAgain()">再読込</button>
              @auth
                 <button class="btn btn-outline-dark button-style" style="background-color: #ffeff8" id="multiRead" data-toggle="modal" data-target="#readModal" data-whatever="@fat">読込</button>
                 <button class="btn btn-outline-dark button-style" style="background-color: #ffeff8;display:none;" id="multiSave" onclick="btnClick_MultiSave()" data-toggle="modal" data-target="#saveModal" data-whatever="@fat">保存</button>
              @endauth
           </div>
           <div>
              <button class="btn btn-outline-dark button-style" style="background-color: #e0ffff" id="multiPlay" onclick="btnClick_MultiPlay()">再生</button>
              <button class="btn btn-outline-dark button-style" style="background-color: #e0ffff" id="multiPause" onclick="btnClick_MultiPause()">停止</button>
              <button class="btn btn-outline-dark button-style" style="background-color: #e0ffff" id="multiSlow" onclick="btnClick_MultiSlow()">倍速(-)</button>
              <button class="btn btn-outline-dark button-style" style="background-color: #e0ffff" id="multiFast" onclick="btnClick_MultiFast()">倍速(+)</button>
              <button class="btn btn-outline-dark button-style" style="background-color: #e0ffff" id="multiMuteRe" onclick="btnClick_MultiMuteRe()">ﾐｭｰﾄ解除</button>
           </div>
           <div id="range_filed" style="display:none;">
               <input style="width: 100%" id="range" name="range" type="range" class="slider" value="0" min="0" max="100" step="1">
           </div>
        </div>
         
        <!-- ビデオエリア1 -->
        <div id='youtubeBoard'>
           <div id='buttonsYou'>
               <button class="btn btn-outline-dark button-style" id="play">再生</button>
               <button class="btn btn-outline-dark button-style" id="pause">停止</button><br>
               <button class="btn btn-outline-dark button-style" id="next100">1秒先</button>
               <button class="btn btn-outline-dark button-style" id="next050">0.5秒先</button>
               <button class="btn btn-outline-dark button-style" id="next010">0.1秒先</button>
               <button class="btn btn-outline-dark button-style" id="next005">0.05秒先</button><br>
               <button class="btn btn-outline-dark button-style" id="prev100">1秒前</button>
               <button class="btn btn-outline-dark button-style" id="prev050">0.5秒前</button>
               <button class="btn btn-outline-dark button-style" id="prev010">0.1秒前</button>
               <button class="btn btn-outline-dark button-style" id="prev005">0.05秒前</button><br>
           </div>
           <div>
              <div class="form-inline">
                  <span>Youtube[URL]：</span>
                  <input type="text" class="form-control" id="idYou1" style="width:48%"></input>
                  <button class="btn btn-outline-dark button-style" id="videoSelct">確定</button>
                  <button class="btn btn-outline-dark button-style" onclick="youBtnDispChange(buttonsYou)" style="background: #ffe4ce;">切替</button>
              </div>
           </div>
           <div id="sampleVideo1"><p></p></div>
           <span id="timer" style="display: none">00:00.000</span>
        </div>
         
        <!-- ビデオエリア2 -->
        <div id='youtubeBoard2'>
           <div id="sampleVideo2"><p></p></div>
            <div class="form-inline">
               <span>Youtube[URL]：</span>
               <input class="form-control" type="text" id="idYou2" style="width:48%"></input>
               <button class="btn btn-outline-dark button-style" id="videoSelct2">確定</button>
               <button class="btn btn-outline-dark button-style" onclick="youBtnDispChange(buttonsYou2)" style="background: #ffe4ce;">切替</button>
           </div>   
           <div id='buttonsYou2'>
               <button class="btn btn-outline-dark button-style" id="play_2">再生</button>
               <button class="btn btn-outline-dark button-style" id="pause_2">停止</button><br>
               <button class="btn btn-outline-dark button-style" id="next100_2">1秒先</button>
               <button class="btn btn-outline-dark button-style" id="next050_2">0.5秒先</button>
               <button class="btn btn-outline-dark button-style" id="next010_2">0.1秒先</button>
               <button class="btn btn-outline-dark button-style" id="next005_2">0.05秒先</button><br>
               <button class="btn btn-outline-dark button-style" id="prev100_2">1秒前</button>
               <button class="btn btn-outline-dark button-style" id="prev050_2">0.5秒前</button>
               <button class="btn btn-outline-dark button-style" id="prev010_2">0.1秒前</button>
               <button class="btn btn-outline-dark button-style" id="prev005_2">0.05秒前</button><br>
           </div>
        </div>
        <!-- <script src="scriptYoutube.js"></script> -->

        <div id='otherLink'>
           <div id='captionLink'>比較対象</div>
           <button class="btn btn-outline-dark button-style" id="linkYouYou" onclick="location.href='{{ route('top') }}'">Youtube - Youtube</button>
           <button class="btn btn-outline-dark button-style" id="linkYouLocal" onclick="location.href='{{ route('youlocal') }}'">Youtube - Local</button>           
           <button class="btn btn-outline-dark button-style" id="linkLocalLocal" onclick="location.href='{{ route('locallocal') }}'">Local - Local</button>
        </div>
     </div>

     <!-- モーダル表示(保存)エリア -->
     <div class="modal fade" id="saveModal" tabindex="-1" role="dialog" aria-labelledby="saveModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="saveModalLabel">保存</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form id="save-form" method="POST" action="{{ route('top.store') }}">
                <div class="modal-body">
                    @csrf
                    <div class="form-group row" style="display:none;">
                        <label for="user_id" class="col-md-2 col-form-label text-md-right">{{ __('ユーザーID') }}</label>
                        <div class="col-md-10">
                            <input id="user_id" type="text" class="form-control" name="user_id" value="{{ Auth::id() }}" required autocomplete="off" autofocus>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="title" class="col-md-2 col-form-label text-md-right">{{ __('タイトル') }}</label>
                        <div class="col-md-10">
                            <input id="title" type="text" class="form-control" name="title" value="" required autocomplete="off" autofocus>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="memo" class="col-md-2 col-form-label text-md-right">{{ __('メモ') }}</label>
                        <div class="col-md-10">
                            <input id="memo" type="text" class="form-control" name="memo" value="" autocomplete="off" autofocus>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="category" class="col-md-2 col-form-label text-md-right">{{ __('カテゴリ') }}</label>
                        <div class="col-md-10">
                            {{ Form::select('category', $save_data, ['placeholder' => 'null'], ['class' => 'form-control', 'id' => 'select2_save_category']) }}
                        </div>
                    </div>

                    <div class="form-group row" style="display:none;">
                        <label for="release_kbn" class="col-md-2 col-form-label text-md-right">{{ __('公開状態') }}</label>
                        <div class="col-md-10">
                            {{ Form::select('release_kbn', ['1' => '非公開','2' => '公開'], 1, ['class' => 'form-control']) }}
                        </div>
                    </div>
                    <div class="form-group row" style="display:none;">
                        <label for="video1_time_st" class="col-md-2 col-form-label text-md-right">{{ __('【動画1】URL') }}</label>
                        <div class="col-md-10">
                            <input id="video1_url" type="text" class="form-control" name="video1_url" value="" autocomplete="off" autofocus>
                        </div>
                    </div>
                    <div class="form-group row" style="display:none;">
                        <label for="video1_time_st" class="col-md-2 col-form-label text-md-right">{{ __('【動画1】開始タイム') }}</label>
                        <div class="col-md-10">
                            <input id="video1_time_st" type="text" class="form-control" name="video1_time_st" value="" autocomplete="off" autofocus>
                        </div>
                    </div>
                    <div class="form-group row" style="display:none;">
                        <label for="video2_url" class="col-md-2 col-form-label text-md-right">{{ __('【動画2】URL') }}</label>
                        <div class="col-md-10">
                            <input id="video2_url" type="text" class="form-control" name="video2_url" value="" autocomplete="off" autofocus>
                        </div>
                    </div>
                    <div class="form-group row" style="display:none;">
                        <label for="video2_time_st" class="col-md-2 col-form-label text-md-right">{{ __('【動画2】開始タイム') }}</label>
                        <div class="col-md-10">
                            <input id="video2_time_st" type="text" class="form-control" name="video2_time_st" value="" autocomplete="off" autofocus>
                        </div>
                    </div>
                    <div class="form-group row" style="display:none;">
                        <label for="video_type" class="col-md-2 col-form-label text-md-right">{{ __('動画タイプ') }}</label>
                        <div class="col-md-10">
                            <input id="video_type" type="text" class="form-control" name="video_type" value="1" autocomplete="off" autofocus>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">閉じる</button>
                  <button type="submit" class="btn btn-primary">保存</button>
                </div>
            </form>
          </div>
        </div>
      </div>
     
     <!-- モーダル表示(読込)エリア -->
     <div class="modal fade" id="readModal" tabindex="-1" role="dialog" aria-labelledby="readModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="readModalLabel">読込</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
                <div class="form-group row">
                  <label for="comparison" class="col-md-2 col-form-label text-md-right">{{ __('対象') }}</label>
                  <div class="col-md-10">
                      {{ Form::select('comparison', $read_data, ['placeholder' => 'null'], ['id' => 'select2_read_category']) }}
                  </div>
                </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">閉じる</button>
              <button type="button" class="btn btn-primary" onclick="read($('#select2_read_category').val())">確定</button>
            </div>
          </div>
        </div>
     </div>
     <div id="footer">
        <p>Copyright (c) 2019 homing All Rights Reserved.</p>
     </div>
@endsection

@section('childScripts')
    <script type="text/javascript">
       var global_read_id = "{{ !empty($comparsion_data) ? $comparsion_data->id : ''}}";
       $('.js-example-basic-single').select2();
    </script>
    <script src="{{ mix('js/youYou.js') }}" defer></script>
@endsection

@section('childCss')
    <link href="{{ mix('css/video.css') }}" rel="stylesheet">
@endsection