<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ResetPasswordNotification extends Notification
{
    use Queueable;

    public $token;

    /**
     * Create a new notification instance.
     */
    public function __construct( string $token)
    {
        $this->token = $token;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        // Tạo URL dẫn tới form reset mật khẩu, truyền email và token
        $url = url('http://localhost:5173/?token='.$this->token . '&email=' . $notifiable->email);

        return (new MailMessage)
                    ->subject('Đặt lại mật khẩu')
                    ->line('Bạn đã yêu cầu đặt lại mật khẩu.')
                    ->action('Đặt lại mật khẩu', $url)
                    ->line('Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
