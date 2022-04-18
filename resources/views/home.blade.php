@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">マイページ</div>

                <div class="card-body">
                    <div id="test" value="ss"></div>
                    
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif
                    
                    <div class="form-inline">
                        <span>比較対象：</span>
                        {{ Form::select('serach_video_type', ['' => '', '1' => 'Youtube - Yutube', '2' => 'Local - Local', '3' => 'Youtube - Local',], '', ['class' => 'form-control', 'id' => 'serach_video_type', 'style' => 'width:70%']) }}
                    </div>
                    <div class="form-inline">
                        <span>カテゴリ：</span>
                        {{ Form::select('serach_category', $category_data, '', ['class' => 'form-control', 'id' => 'serach_category', 'style' => 'width:70%']) }}
                    </div>
                    @foreach ($comparsion_data as $record)
                        <div class="card comparison_group" style="width:100%;">
                            <div class="card-body">
                              <h6 class="card-text text-muted">{{ $record->category }}</h6>
                              @if ($record->video_type == 1)
                                <h5 class="card-title"><a href="{{ route('top.read', [$record->id]) }}">{{ $record->title }}</a></h5>
                              @elseif ($record->video_type == 2)
                                <h5 class="card-title"><a href="{{ route('locallocal.read', [$record->id]) }}">{{ $record->title }}</a></h5>
                              @elseif ($record->video_type == 3)
                                <h5 class="card-title"><a href="{{ route('youlocal.read', [$record->id]) }}">{{ $record->title }}</a></h5>
                              @endif
                              <h6 class="card-subtitle text-muted">{{ $record->memo }}</h6>
                              <h6 hidden>{{ $record->created_at }}</h6>
                              <h6 class="video_type_disp"><?= videoTypeNmGet($record->video_type) ?></h6>
                              <input type="text" class="video_type_value" hidden value="{{ $record->video_type }}">
                              <button type="button" id="home_tweat"class="btn btn-info" onclick="btnClick_ReadTweat({{ $record->id }}, '{{ $record->title }}')" style="color:#fff" {{ $record->video_type == 1 ?: 'hidden'}}>ツイート</button>
                              <button type="button" id="home_delete" class="btn btn-danger" onclick="if(deleteConfirm('{{ $record->title }}')) btnClick_ReadDelete({{ $record->id }})">削除</button>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('childScripts')
    <script src="{{ mix('js/home.js') }}" defer></script>
    <script src="{{ mix('js/analytics.js') }}" defer></script>
@endsection

<?php
    // 対象動画名称取得
    function videoTypeNmGet($id){
        $nm = "";
        switch ($id) {
            case 1:
                $nm = 'Youtube - Youtube';
                break;
            case 2:
                $nm = 'Local - Local';
                break;
            case 3:
                $nm = 'Youtube - Local';
                break;
        }
        return $nm;
    }
?>