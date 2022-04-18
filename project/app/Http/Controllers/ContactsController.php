<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Model\Comparison;
use Illuminate\Support\Facades\Log;
use Mail;

class ContactsController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(){
        return view('/contacts');
    }
    
    // メール送信
    public function send(Request $request){
        $text = "【お問い合わせ内容】". "\n". $request->hope. "\n". "【メールアドレス】". "\n". $request->email;
        Mail::raw($text, function ($message) {
            $message->to('ito00321@yahoo.co.jp')
            ->subject('【要望】');
        });
        return view('/contacts_complete');
    }
    
}
