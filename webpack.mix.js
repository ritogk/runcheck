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

mix
  .styles(
    [
      //'resources/sass/style.css',
      "resources/sass/select2.min.css",
      //    'resources/css/fontawesome-all.min.css',
    ],
    "public/css/all.css"
  )
  .version()

mix
  .scripts(
    [
      //'resources/js/scriptYoutube.js',
      //'resources/js/scriptSelVideo.js',
      //'resources/js/smartScaling.js',
      "resources/js/select2.min.js",
      //"resources/js/top_script.js",
      //'resources/js/jquery-3.4.1.min.js',
    ],
    "public/js/all.js"
  )
  .version()
