<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactMessageMail extends Mailable
{
    use Queueable, SerializesModels;

    public $msgData;

    public function __construct($msgData)
    {
        $this->msgData = $msgData;
    }

    public function build()
    {
        return $this->subject('Pesan Baru dari Website: ' . $this->msgData['subject'])
                    ->view('emails.contact');
    }
}