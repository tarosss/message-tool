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

class CreateMessage implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    protected $messages;
    protected $files;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($messages, $files = [])
    {
        $this->messages = $messages;
        $this->files = $files;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('create_message');
    }

    public function broadcastWith()
    {
        return [
            'messages' => $this->messages,
            'files' => $this->files,
        ];
    }

    // public function broadcastAs()
    // {
    //     return 'ssssssss';
    // }
}
