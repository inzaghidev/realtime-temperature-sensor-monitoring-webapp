<?php

namespace App\Http\Controllers;

use App\Models\Sensor;
use Illuminate\Http\Request;

class SensorController extends Controller
{
    public function broadcastTemperature()
    {
        $sensors = Sensor::all();

        foreach ($sensors as $sensor) {
            // Menggunakan broadcast untuk mengirim nilai suhu ke frontend melalui WebSocket
            broadcast(new \App\Events\TemperatureUpdate($sensor->id, rand(20, 30) + (float)rand()/(float)getrandmax()));
        }

        return response()->json(['message' => 'Temperature broadcasted successfully']);
    }
}
