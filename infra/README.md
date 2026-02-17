# RunCheck Infrastructure (AWS CDK)

## 環境

| 環境 | スタック名 | サブドメイン | DynamoDB テーブル |
|------|-----------|-------------|------------------|
| dev  | RunCheckDevStack | runcheck-dev.homisoftware.net | RunCheck-dev |
| prod | RunCheckProdStack | runcheck.homisoftware.net | RunCheck-prod |

## セットアップ

```bash
# 依存インストール
npm install

# 環境変数ファイルを設定
cp infra/.env.base infra/.env.dev   # dev 用を編集
cp infra/.env.base infra/.env.prod  # prod 用を編集
```

## デプロイ

```bash
# dev 環境
npm run deploy:dev

# prod 環境
npm run deploy:prod
```

## その他のコマンド

```bash
# CloudFormation テンプレート生成 (差分確認前に)
npm run synth:dev
npm run synth:prod

# デプロイ差分確認
npm run diff:dev
npm run diff:prod
```

## データ移行

既存の `RunCheck` テーブルから `RunCheck-prod` へ移行する場合:

```bash
# 1. まず prod スタックをデプロイして RunCheck-prod テーブルを作成
npm run deploy:prod

# 2. dry-run で移行対象を確認
npx ts-node backend/scripts/migration/rename-table.ts \
  --source RunCheck --target RunCheck-prod --dry-run

# 3. 実行
npx ts-node backend/scripts/migration/rename-table.ts \
  --source RunCheck --target RunCheck-prod
```

## 環境変数 (.env.{dev|prod})

| 変数名 | 説明 |
|--------|------|
| `DOMAIN` | ルートドメイン |
| `HOST_ZONE_ID` | Route53 ホストゾーン ID |
| `SUB_DOMAIN` | CloudFront に紐づくサブドメイン |
| `JWT_SECRET` | JWT 署名用シークレット |
| `YOUTUBE_CLIENT_ID` | YouTube OAuth クライアント ID |
| `YOUTUBE_CLIENT_SECRET` | YouTube OAuth クライアントシークレット |
| `YOUTUBE_REDIRECT_URL` | YouTube OAuth リダイレクト URL |
