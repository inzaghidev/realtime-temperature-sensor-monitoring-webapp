<?php

namespace App\Listeners;

use App\Events\TemperatureUpdate;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendTemperatureUpdateListener implements ShouldQueue
{
    public function handle(TemperatureUpdate $event)
    {
        broadcast(new TemperatureUpdate($event->sensorId, $event->temperature));
    }
}