## アプリ概要

サーキットのラップタイム更新を目的にした動画比較サービス<br>
スマホでの使用を想定<br>
<br>
<br>

## 作った経緯

コンマ数秒を意識した動画比較サービスがなかった。<br>
サーキットを走ってる人はコンマ数秒を気にするのでそこが超重要。<br>
自身のベストラップ、セカンドラップを比較してどこのコーナーが速いのか？確認したり<br>
youtube 上の他人の車載動画とも比較できて便利なのではと思い作りました。<br>

## リンク

https://homingsoft.net/vidcomp/ <br>
<br>
動作サンプル(画面幅をスマホサイズにして下さい)<br>
https://t.co/GYaNkPM9b4?amp=1<br>
<br>
https://twitter.com/homing_fd2/status/1340095765180379136?s=20<br>
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
