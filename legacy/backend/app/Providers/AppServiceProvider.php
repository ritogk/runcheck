<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Routing\UrlGenerator;

use App\Core\YouTube\OAuthYoutubeClientInterface;
use App\Core\YouTube\OAuthYoutubeClient;
use Google_Client;

use App\Core\YouTube\YoutubeVideofetcherInterface;
use App\Core\YouTube\YoutubeVideofetcher;

use App\UseCase\Comparison\Repository\ComparisonRepository;
use App\UseCase\Comparison\Repository\IComparisonRepository;
use App\UseCase\OperationLog\Repository\IOperationLogRepository;
use App\UseCase\OperationLog\Repository\OperationLogRepository;
use App\UseCase\User\Repository\IUserRepository;
use App\UseCase\User\Repository\UserRepository;
use App\UseCase\Comparison\Repository\ComparisonEntity;
use App\UseCase\YouTube\Repository\IYoutubeTokenRepository;
use App\UseCase\YouTube\Repository\YoutubeTokenRepository;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        // 外部リソースに依存しそうなものはここでbindする。
        $this->app->singleton(OAuthYoutubeClientInterface::class, function ($app) {
            $clinet = new Google_Client();
            $client_id = config('oauth.youtube.client_id');
            $client_secret = config('oauth.youtube.client_secret');
            $redirect_url = config('oauth.youtube.redirect_url');
            return new OAuthYoutubeClient($clinet, $client_id, $client_secret, $redirect_url);
        });
        $this->app->bind(YoutubeVideofetcherInterface::class, YoutubeVideofetcher::class);

        // repository
        $this->app->bind(IComparisonRepository::class, ComparisonRepository::class);
        $this->app->bind(IOperationLogRepository::class, OperationLogRepository::class);
        $this->app->bind(IUserRepository::class, UserRepository::class);
        $this->app->bind(IComparisonEntity::class, ComparisonEntity::class);
        $this->app->bind(IYoutubeTokenRepository::class, YoutubeTokenRepository::class);
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
