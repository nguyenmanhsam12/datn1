<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PayTheBillMail extends Mailable
{
    use Queueable, SerializesModels;

    public array $contentAndData;

    /**
     * Create a new message instance.
     */
    public function __construct(array $contentAndData)
    {
        $this->contentAndData = $contentAndData;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->contentAndData['subject'],
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {

        return new Content(
            view: 'orders.sendmail',
            with: [
                'user' => $this->contentAndData['user'],
                'listCart' => $this->contentAndData['listCart'],
                'payment_status' => $this->contentAndData['payment_status'],
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
