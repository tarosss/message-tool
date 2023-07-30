<?php

namespace App\Events;

use App\Models\Message;
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

    /**
     * Create a new event instance.
     *
     * @return void
     */

    protected $insertedMessages;
    public function __construct($insertedMessages)
    {
        Log::info('create message event');
        $this->insertedMessages = $insertedMessages;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        Log::info('cats');
        return new Channel('create_message');
    }

    public function broadcastWith()
    {
        Log::info('with');
        return [
            'message' => 'a',
        ];
    }

    // public function broadcastAs()
    // {
    //     Log::info('with');
    //     return 'message';
    // }
}
