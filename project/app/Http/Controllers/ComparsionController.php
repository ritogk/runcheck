<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Model\Comparison;;

class ComparsionController extends Controller
{
    // １件取得(ajax用)
    public function find_comparsion($id)
    {
        return Comparison::where("id", "=", $id)->first();
    }
}
