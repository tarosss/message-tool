<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Log;

class UpdateChannel implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    protected $channels;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($channels, $files = [])
    {
        $this->channels = $channels;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('update_channel');
    }

    public function broadcastWith()
    {
        return [
            'channels' => $this->channels,
        ];
    }

    // public function broadcastAs()
    // {
    //     return 'ssssssss';
    // }
}
