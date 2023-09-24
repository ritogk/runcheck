<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Routing\UrlGenerator;

use App\Core\YouTube\IOAuthYoutubeClient;
use App\Core\YouTube\OAuthYoutubeClient;
use Google_Client;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(IOAuthYoutubeClient::class, function ($app) {
            $clinet = new Google_Client();
            $client_id = config('oauth.youtube.client_id');
            $client_secret = config('oauth.youtube.client_secret');
            $redirect_url = config('oauth.youtube.redirect_url');
            return new OAuthYoutubeClient($clinet, $client_id, $client_secret, $redirect_url);
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot(UrlGenerator $url)
    {
        $ssl = config('app.ssl');
        if ($ssl) {
            // Laravelで生成するURLをHTTPS強制にする
            $url->forceScheme('https');
        }
    }
}
