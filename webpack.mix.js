const mix = require("laravel-mix")

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
  .js("resources/js/app.js", "public/js")
  .sass("resources/sass/app.scss", "public/css")

// mix.styles(["resources/sass/select2.min.css"], "public/css/all.css").version()
mix.scripts(["resources/js/analytics.js"], "public/js/analytics.js").version()

mix.scripts(["resources/js/select2.min.js"], "public/js/all.js").version()
mix.scripts(["resources/js/home.js"], "public/js/home.js").version()
mix
  .scripts(
    ["resources/js/youYouControl.js", "resources/js/youYouVideo.js"],
    "public/js/youYou.js"
  )
  .version()
mix
  .scripts(
    ["resources/js/youlocalControl.js", "resources/js/youLocalVideo.js"],
    "public/js/youLocal.js"
  )
  .version()
mix
  .scripts(
    ["resources/js/localLocalControl.js", "resources/js/localLocalVideo.js"],
    "public/js/localLocal.js"
  )
  .version()
