## 技術
- laravel

## アプリ概要

サーキットでラップタイム更新を目的にした車載比較アプリ<br>
スマホでの使用を想定<br>
<br>
<br>

## リンク

http://runcheck.homisoftware.net/lp/ja <br>
<br>
動作サンプル(画面幅をスマホサイズにして下さい)<br>
https://runcheck.homisoftware.net/youyou-read/22<br>
<br>
https://twitter.com/homing_fd2/status/1516361339748319235?s=20&t=m7lv_Mh4W78hdyT9CsLSYQ<br>
<br>
<br>

## 機能一覧

- youtube と youtube の比較
- youtube と local の比較
- local と local の比較
- 比較詳細の保存
- 比較詳細の SNS 共有

## 使用画面

|                                                    比較画面　                                                     |     |
| :---------------------------------------------------------------------------------------------------------------: | :-: |
| <img src="https://user-images.githubusercontent.com/72111956/107892429-5d728400-6f68-11eb-872b-e532ca898251.png"> |

<br>

<br>
<br>

## 環境設定

### host

```
git clone git@github.com:ritogk/vidcomp.git
docekr-compose up -d
```

### php container

```sh
chmod +x ./setup.sh
./setup.sh
php artisan migrate:refresh --seed
php artisan serve --host 0.0.0.0
```

<br>
<br>
