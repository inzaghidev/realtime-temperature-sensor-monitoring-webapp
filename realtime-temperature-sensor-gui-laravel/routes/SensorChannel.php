<?php

namespace App\Broadcasting;

use Illuminate\Support\Facades\Log;

class SensorChannel
{
    public function join($sensorId)
    {
        Log::info("User joined Sensor channel: $sensorId");
        return true;
    }
}