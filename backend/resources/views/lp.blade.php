<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="{{__('lp.html-description')}}" />
        <meta name="author" content="ritogk" />
        <link rel=”alternate” hreflang=”ja” lang="ja" href="{{ route('lp.ja') }}">
        <link rel="alternate" hreflang="en-gb" lang="en" href="{{ route('lp.en') }}" />
        <link rel="alternate" hreflang="en-us" lang="en" href="{{ route('lp.en') }}" />
        <link rel="alternate" hreflang="en-au" lang="en" href="{{ route('lp.en') }}" />

        <title>{{__('lp.html-title')}}</title>
        <!-- Bootstrap icons-->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" rel="stylesheet" />
        
        <!-- Google fonts-->
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,600;1,600&amp;display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,300;0,500;0,600;0,700;1,300;1,500;1,600;1,700&amp;display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,400;1,400&amp;display=swap" rel="stylesheet" />
        <!-- Core theme CSS (includes Bootstrap)-->
        <link href="{{ App\Assets\Helpers::cacheBusting('/lp/css/styles.css') }}" rel="stylesheet" />

        @if(config('app.env') === 'production')
            @include('components.gtag')
            @include('components.clarity-lp')
        @endif
    </head>
    <body id="page-top">
        <!-- Navigation-->
        <nav class="navbar navbar-expand-lg navbar-light fixed-top shadow-sm " id="mainNav">
            <div class="container px-4">
                <div>
                    <a class="navbar-brand fw-bold" href="#page-top">RunCheck</a>
                </div>
                <div class="ms-auto">
                    <a class="border me-1" href="{{ route('lp.ja')}}"><img src="{{ App\Assets\Helpers::cacheBusting('/lp/img/flags/Japan.png') }}" alt="..." /></a>
                </div>
                <div>
                    <a class="border me-1" href="{{ route('lp.en')}}"><img src="{{ App\Assets\Helpers::cacheBusting('/lp/img/flags/United-States.png') }}" alt="..." /></a>
                    
                </div>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i class="bi-list"></i>
                </button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ms-auto me-4 my-3 my-lg-0">
                        <li class="nav-item"><a class="nav-link me-lg-3" href="#features">{{__('lp.基本機能')}}</a></li>
                        <li class="nav-item"><a class="nav-link me-lg-3" href="#demo">{{__('lp.デモ')}}</a></li>
                        <li class="nav-item"><a class="nav-link me-lg-3" href="#screenshot">{{__('lp.スクリーンショット')}}</a></li>
                        <li class="nav-item"><a class="nav-link me-lg-3" href="#startnow">{{__('lp.今すぐ起動')}}</a></li>
                        <li class="nav-item"><a class="nav-link me-lg-3" href="https://twitter.com/homing_fd2">{{__('lp.お問い合わせ')}}</a></li>
                    </ul>
                </div>
            </div>
        </nav>
        
        <!-- Mashead header-->
        <header class="masthead">
            <div class="container px-5">
                <div class="row gx-5 align-items-center">
                    <div class="col-lg-6">
                        <!-- Mashead text and app badges-->
                        <div class="mb-5 mb-lg-0 text-center text-lg-start">
                            <h1 class="display-1 lh-1 mb-3">{{__('lp.車載動画でサーキットを攻略！タイムアップのための比較アプリ')}}</h1>
                            <p class="lead fw-normal text-muted mb-4">{{__('lp.サーキットに特化した車載動画比較アプリ。気になるあの人やベストラップとセカンドラップ等の比較が無料で簡単に行えます。youtubeで公開されている全ての車載動画と比較が行えるので比較対象は無限大！！')}}</p>
                            <div class="d-flex flex-column flex-lg-row align-items-center">
                                <a class="me-lg-3 mb-1 mb-lg-0" href="{{ route('app', ['any' => 'index']) }}"><img class="app-badge" src="{{ App\Assets\Helpers::cacheBusting('/lp/img/startapp.png') }}" alt="..." /></a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <!-- Masthead device mockup feature-->
                        <div class="masthead-device-mockup">
                            <svg class="circle" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <linearGradient id="circleGradient" gradientTransform="rotate(45)">
                                        <stop class="gradient-start-color" offset="0%"></stop>
                                        <stop class="gradient-end-color" offset="100%"></stop>
                                    </linearGradient>
                                </defs>
                                <circle cx="50" cy="50" r="50"></circle>
                            </svg>
                            <div class="device-wrapper">
                                <div class="device" data-device="iPhoneX" data-orientation="portrait" data-color="black">
                                    <div class="screen bg-black">
                                        <img src="{{ App\Assets\Helpers::cacheBusting('/lp/img/iphone-demo.gif') }}" style="max-width: 100%; height: 100%" alt="..." />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <!-- Quote/testimonial aside-->
        <aside class="text-center bg-gradient-primary-to-secondary">
            <div class="container px-5">
                <div class="row gx-5 justify-content-center">
                    <div class="col-xl-8">
                        <img src="{{ App\Assets\Helpers::cacheBusting('/lp/img/homisoftware-logo.svg') }}" alt="..." style="width:200px" />
                    </div>
                </div>
            </div>
        </aside>
        <!-- App features section-->
        <section id="features">
            <div class="container px-5">
                <div class="row gx-5 align-items-center">
                    <div class="col-lg-8 order-lg-1 mb-5 mb-lg-0">
                        <div class="container-fluid px-5">
                            <div class="row gx-5">
                                <div class="col-md-6 mb-5 mb-md-0">
                                    <!-- Feature item-->
                                    <div class="text-center">
                                        <i class="bi-gift icon-feature text-gradient d-block mb-3"></i>
                                        <h3 class="font-alt">{{__('lp.完全無料')}}</h3>
                                        <p class="text-muted mb-0">{{__('lp.すべてのサービスを完全無料でご利用いただけます。')}}</p>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <!-- Feature item-->
                                    <div class="text-center">
                                        <i class="bi-speedometer icon-feature text-gradient d-block mb-3"></i>
                                        <h3 class="font-alt">{{__('lp.ｽﾎﾟｰﾂ走行に特化')}}</h3>
                                        <p class="text-muted mb-0">{{__('lp.スポーツ走行向けに使いやすいよう調整しております。')}}</p>
                                    </div>
                                </div>
                                
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <!-- Feature item-->
                                    <div class="text-center">
                                        <i class="bi-camera-video icon-feature text-gradient d-block mb-3"></i>
                                        <h3 class="font-alt">{{__('lp.様々な動画に対応')}}</h3>
                                        <p class="text-muted mb-0">{{__('lp.youtube又は端末内の全ての動画に対応')}}</p>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <!-- Feature item-->
                                    <div class="text-center">
                                        <i class="bi-emoji-smile icon-feature text-gradient d-block mb-3"></i>
                                        <h3 class="font-alt">{{__('lp.簡単操作')}}</h3>
                                        <p class="text-muted mb-0">{{__('lp.複雑な操作はありません。')}}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <!-- Feature item-->
                                    <div class="text-center">
                                        <i class="bi-twitter icon-feature text-gradient d-block mb-3"></i>
                                        <h3 class="font-alt">{{__('lp.SNS共有可能')}}</h3>
                                        <p class="text-muted mb-0">{{__('lp.比較した内容をSNSで共有できます。')}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Basic features section-->
        <section class="bg-light">
            <div class="container px-5">
                <div class="row gx-5 align-items-center justify-content-center justify-content-lg-between">
                    <div class="col-12">
                        <h2 class="display-4 lh-1 mb-2">{{__('lp.基本機能')}}</h2>
                        <p class="lead fw-normal text-muted mb-1">・{{__('lp.youtube又は端末内の動画の比較')}}</p>
                        <p class="lead fw-normal text-muted mb-1">・{{__('lp.比較した結果の保存(ユーザー登録する必要あり)')}}</p>
                        <p class="lead fw-normal text-muted mb-1">・{{__('lp.比較した結果をツイッター等で共有')}}</p>
                    </div>
                </div>
            </div>
        </section>
        <!-- App demo section-->
        <section id="demo" class="bg-white">
            <div class="container px-5">
                <h2 class="display-4 lh-1 mb-2">{{__('lp.デモ')}}</h2>
                <iframe style="aspect-ratio: 16 / 9;width: 100%;height: 400px;" src="https://www.youtube.com/embed/2yt_BNky6Kg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </section>
        <!-- App demo section-->
        <section id="screenshot" class="bg-light">
            <div class="container px-5">
                <h2 class="display-4 lh-1 mb-2">{{__('lp.スクリーンショット')}}</h2>
                <div class="row">
                    <div class="col">
                        <img class="rounded img-fluid" src="{{ App\Assets\Helpers::cacheBusting('/lp/img/screenshot3.jpg') }}" alt="..." />
                    </div>
                    <div class="col">
                        <img class="rounded img-fluid" src="{{ App\Assets\Helpers::cacheBusting('/lp/img/screenshot1.jpg') }}" alt="..." />
                    </div>
                    <div class="col">
                        <img class="rounded img-fluid" src="{{ App\Assets\Helpers::cacheBusting('/lp/img/screenshot2.jpg') }}" alt="..." />
                    </div>
                </div>
            </div>
        </section>
        <!-- Footer-->
        <!-- App badge section-->
        <section class="bg-gradient-primary-to-secondary" id="startnow">
            <div class="container px-5">
                <h2 class="text-center text-white font-alt mb-4">{{__('lp.今すぐ起動')}}</h2>
                <div class="d-flex flex-column flex-lg-row align-items-center justify-content-center">
                    <a class="me-lg-3 mb-4 mb-lg-0" href="{{ route('app', ['any' => 'index']) }}"><img class="app-badge" src="{{ App\Assets\Helpers::cacheBusting('/lp/img/startapp.png') }}" alt="..." /></a>
                </div>
            </div>
        </section>
        <!-- Footer-->
        <footer class="bg-black text-center py-5">
            <div class="container px-5">
                <div class="text-white-50 small">
                    <a class="mx-2" href="{{ route('terms')}}">{{__('lp.利用規約')}}</a>
                    <a href="{{ route('privacy')}}">{{__('lp.プライバシーポリシー')}}</a>
                </div>
            </div>
        </footer>
        <!-- Feedback Modal-->
        <div class="modal fade" id="feedbackModal" tabindex="-1" aria-labelledby="feedbackModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header bg-gradient-primary-to-secondary p-4">
                        <h5 class="modal-title font-alt text-white" id="feedbackModalLabel">Send feedback</h5>
                        <button class="btn-close btn-close-white" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body border-0 p-4">
                        <!-- * * * * * * * * * * * * * * *-->
                        <!-- * * SB Forms Contact Form * *-->
                        <!-- * * * * * * * * * * * * * * *-->
                        <!-- This form is pre-integrated with SB Forms.-->
                        <!-- To make this form functional, sign up at-->
                        <!-- https://startbootstrap.com/solution/contact-forms-->
                        <!-- to get an API token!-->
                        <form id="contactForm" data-sb-form-api-token="API_TOKEN">
                            <!-- Name input-->
                            <div class="form-floating mb-3">
                                <input class="form-control" id="name" type="text" placeholder="Enter your name..." data-sb-validations="required" />
                                <label for="name">Full name</label>
                                <div class="invalid-feedback" data-sb-feedback="name:required">A name is required.</div>
                            </div>
                            <!-- Email address input-->
                            <div class="form-floating mb-3">
                                <input class="form-control" id="email" type="email" placeholder="name@example.com" data-sb-validations="required,email" />
                                <label for="email">Email address</label>
                                <div class="invalid-feedback" data-sb-feedback="email:required">An email is required.</div>
                                <div class="invalid-feedback" data-sb-feedback="email:email">Email is not valid.</div>
                            </div>
                            <!-- Phone number input-->
                            <div class="form-floating mb-3">
                                <input class="form-control" id="phone" type="tel" placeholder="(123) 456-7890" data-sb-validations="required" />
                                <label for="phone">Phone number</label>
                                <div class="invalid-feedback" data-sb-feedback="phone:required">A phone number is required.</div>
                            </div>
                            <!-- Message input-->
                            <div class="form-floating mb-3">
                                <textarea class="form-control" id="message" type="text" placeholder="Enter your message here..." style="height: 10rem" data-sb-validations="required"></textarea>
                                <label for="message">Message</label>
                                <div class="invalid-feedback" data-sb-feedback="message:required">A message is required.</div>
                            </div>
                            <!-- Submit success message-->
                            <!---->
                            <!-- This is what your users will see when the form-->
                            <!-- has successfully submitted-->
                            <div class="d-none" id="submitSuccessMessage">
                                <div class="text-center mb-3">
                                    <div class="fw-bolder">Form submission successful!</div>
                                    To activate this form, sign up at
                                    <br />
                                    <a href="https://startbootstrap.com/solution/contact-forms">https://startbootstrap.com/solution/contact-forms</a>
                                </div>
                            </div>
                            <!-- Submit error message-->
                            <!---->
                            <!-- This is what your users will see when there is-->
                            <!-- an error submitting the form-->
                            <div class="d-none" id="submitErrorMessage"><div class="text-center text-danger mb-3">Error sending message!</div></div>
                            <!-- Submit Button-->
                            <div class="d-grid"><button class="btn btn-primary rounded-pill btn-lg disabled" id="submitButton" type="submit">Submit</button></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- Bootstrap core JS-->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
        <!-- Core theme JS-->
        <script src="{{ App\Assets\Helpers::cacheBusting('/lp/js/scripts.js') }}"></script>
    </body>
</html>
