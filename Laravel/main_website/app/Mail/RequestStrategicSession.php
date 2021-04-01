<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Model\StrategicRequest;

class RequestStrategicSession extends Mailable
{
    use Queueable, SerializesModels;

    public $strategic_request;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct( StrategicRequest $req )
    {
        $this->strategic_request = $req;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('pages.strategic.request_mail')
            ->with([
                'data'   => $this->strategic_request
            ]);
    }
}
