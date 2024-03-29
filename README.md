# Runcheck
サーキットを本気で走っている人向けのタイム更新を目的にしたアプリです。  
撮影した走行動画のベストラップと各ラップの比較が簡単に行えて運転の最適化が行なえます。  
Youtube動画とも比較できるので、全世界のライバルと自分を簡単に比較する事もできます。  
スマホでの使用を想定しています。  
  

## リンク
http://runcheck.homisoftware.net/lp/ja <br>
↓ 動作サンプル(スマホに最適化してます)<br>
https://runcheck.homisoftware.net/app/index?comparisonId=67<br>
<br>

## テストユーザー
email: homing0321r4cfw@yahoo.co.jp  
password: P@ssw0rd  
https://runcheck.homisoftware.net/app/login  

## 画面



| 動画を同期する画面 | 動画を比較する画面 | YouTubeから動画を選択する画面 |
| :-: | :-: | :-: |
| <img src="https://github.com/ritogk/runcheck/assets/72111956/385a9f76-f9c1-4771-82c9-cb9d13463790"> | <img src="https://github.com/ritogk/runcheck/assets/72111956/e5da37f9-6702-4cd9-889d-dbfceccbc116"> | <img src="https://github.com/ritogk/runcheck/assets/72111956/87748827-2d3c-4ab7-9f16-0b38dfcf765a"> |


| ホーム | 新規登録 | ログイン |
| :-: | :-: | :-: |
| <img src="https://github.com/ritogk/runcheck/assets/72111956/358c16e9-21e2-43f8-9a0b-bed9ac946846"> | <img src="https://github.com/ritogk/runcheck/assets/72111956/8bb15596-ada8-4d62-bb10-c3ded5129141"> | <img src="https://github.com/ritogk/runcheck/assets/72111956/5704f020-2779-4d99-916d-48af0e28a63a"> |
<br>
<br>

## 環境設定

### host

```
git clone git@github.com:ritogk/runcheck.git
cd runcheck
docekr-compose up -d
```

### backend setup
run in php-container
```sh
chmod +x ./setup.sh
cp .env.base .env
./setup.sh
php artisan migrate:refresh --seed
php artisan serve --host 0.0.0.0
```

### backend test
```sh
php artisan test
```

### frontend setup
```sh
cd frontend
nvm use
cp src/env.base.ts src/env.ts
yarn install
yarn watch
```

## storybook
```sh
cd frontend
yarn storybook
```

## frotnend test
```sh
cd frontend
yarn e2e
```

## インフラ
### awsセットアップ
```sh
cd infra/cdk
cp .env.base
vim .env
cdk deploy --all
```
1. GUIでIAMユーザーのアクセスキーとシークレットキーを作成  

### VPSセットアップ
```sh
cd infra/cron
cp backup-db.base.sh backup-db.sh
sudo vim backup-db.sh #アクセスキーとシークレットキーを書き込む
chmod +x backup-db.sh
crontab -e
  0 0 1 * * /home/ubuntu/runcheck/infra/cron/backup-db.sh
```

<br>
<br>
