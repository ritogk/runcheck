<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Model\Comparison;
use Auth;

class TopController extends Controller{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(){
        $user_id = Auth::id();
        return view('/top', ['userid' => $user_id, 'read_data' => $this->read_data(), 'save_data' => $this->save_data()]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request){
        $data = new Comparison;
        $data->create($request->all());
        return redirect('/top');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id){
        $data = Comparison::find($id);
        $data->delete();
        return redirect('/top');
    }
    
    // １件取得(ajax用)
    public function on_data_get($id){
        return Comparison::where("id", "=", $id)->first();
    }
    
    // ツイートから飛んできた用
    public function tweat($id){
        $comparsion_data = Comparison::find($id);
        $user_id = Auth::id();
        // 非公開データ
        if($comparsion_data->release_kbn == 1){
            return view('/top', ['userid' => $user_id, 'read_data' => $this->read_data(), 'save_data' => $this->save_data()]);
        }else{
            return view('/top', ['userid' => $user_id, 'read_data' => $this->read_data(), 'save_data' => $this->save_data(), 'comparsion_data' => $comparsion_data]);
        } 
    }
    
    // 読み込み用
    public function read($id){
        $comparsion_data = Comparison::find($id);
        $user_id = Auth::id();
        // 登録したユーザーと違う場合は、トップページへ飛ぶ
        if($user_id != $comparsion_data->user_id){
            return view('/top', ['userid' => $user_id, 'read_data' => $this->read_data(), 'save_data' => $this->save_data()]);
        }else{
            return view('/top', ['userid' => $user_id, 'read_data' => $this->read_data(), 'save_data' => $this->save_data(), 'comparsion_data' => $comparsion_data]);
        } 
    }
    
    // 読み込みデータ
    public function read_data(){
        return Comparison::select2DataGet(Auth::id(), 1);
    }
    
    // 保存データ
    public function save_data(){     
        return Comparison::select('category')
                        ->where("user_id", "=", Auth::id())
                        ->groupBy('category')
                        ->pluck('category', 'category');
    }
    
}
