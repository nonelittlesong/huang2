<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;

class DetectController extends Controller
{
    function getResult() {
        $resultStr = "";

        $handle = fopen('/home/song/Desktop/result.txt', 'r');
        if (!feof($handle)) {
            $resultStr = fgets($handle);
        }

        fclose($handle);

        $resultArray = json_decode($resultStr, true);
        $resultArray["resultStr"] = $resultArray["resultStr"] ? "PASS" : "FAIL";

        return $resultArray; // 自动转为json
    }
}
