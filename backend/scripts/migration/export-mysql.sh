#!/bin/bash
# ==============================================
# MySQL → JSON エクスポートスクリプト
# レンタルサーバー上で実行してください
# ==============================================
#
# 使い方:
#   1. このファイルをレンタルサーバーにコピー
#   2. 環境変数を設定するか、直接書き換え
#   3. chmod +x export-mysql.sh && ./export-mysql.sh
#   4. 生成された exported_data/ ディレクトリをローカルにダウンロード
#

MYSQL_HOST="${MYSQL_HOST:-127.0.0.1}"
MYSQL_PORT="${MYSQL_PORT:-3306}"
MYSQL_USER="${MYSQL_USER:-root}"
MYSQL_PASS="${MYSQL_PASS:-}"
MYSQL_DB="${MYSQL_DB:-runcheck}"
OUTPUT_DIR="${OUTPUT_DIR:-./exported_data}"

mkdir -p "$OUTPUT_DIR"

MYSQL_CMD="mysql -h $MYSQL_HOST -P $MYSQL_PORT -u $MYSQL_USER -N"
if [ -n "$MYSQL_PASS" ]; then
  MYSQL_CMD="$MYSQL_CMD -p$MYSQL_PASS"
fi
MYSQL_CMD="$MYSQL_CMD $MYSQL_DB"

echo "=== MySQL → JSON Export ==="
echo "Host: $MYSQL_HOST:$MYSQL_PORT"
echo "Database: $MYSQL_DB"
echo ""

# users (soft delete除外)
echo "Exporting users..."
$MYSQL_CMD --batch --raw -e "
SELECT JSON_OBJECT(
  'id', id,
  'name', name,
  'email', email,
  'password', password,
  'car_type', IFNULL(car_type, ''),
  'created_at', DATE_FORMAT(created_at, '%Y-%m-%dT%H:%i:%s.000Z'),
  'updated_at', DATE_FORMAT(updated_at, '%Y-%m-%dT%H:%i:%s.000Z')
)
FROM users
WHERE deleted_at IS NULL;
" > "$OUTPUT_DIR/users.jsonl"
USER_COUNT=$(wc -l < "$OUTPUT_DIR/users.jsonl")
echo "  -> $USER_COUNT records"

# comparisons (soft delete除外)
echo "Exporting comparisons..."
$MYSQL_CMD --batch --raw -e "
SELECT JSON_OBJECT(
  'id', id,
  'user_id', user_id,
  'title', IFNULL(title, ''),
  'memo', IFNULL(memo, ''),
  'category', IFNULL(category, ''),
  'video1_url', IFNULL(video1_url, ''),
  'video1_time_st', IFNULL(video1_time_st, 0),
  'video1_type', IFNULL(video1_type, ''),
  'video2_url', IFNULL(video2_url, ''),
  'video2_time_st', IFNULL(video2_time_st, 0),
  'video2_type', IFNULL(video2_type, ''),
  'release_kbn', IFNULL(release_kbn, 0),
  'anonymous', IFNULL(anonymous, 0),
  'created_at', DATE_FORMAT(created_at, '%Y-%m-%dT%H:%i:%s.000Z'),
  'updated_at', DATE_FORMAT(updated_at, '%Y-%m-%dT%H:%i:%s.000Z')
)
FROM comparisons
WHERE deleted_at IS NULL;
" > "$OUTPUT_DIR/comparisons.jsonl"
COMP_COUNT=$(wc -l < "$OUTPUT_DIR/comparisons.jsonl")
echo "  -> $COMP_COUNT records"

# youtube_tokens (soft delete除外)
echo "Exporting youtube_tokens..."
$MYSQL_CMD --batch --raw -e "
SELECT JSON_OBJECT(
  'user_id', user_id,
  'refresh_token', refresh_token,
  'created_at', DATE_FORMAT(created_at, '%Y-%m-%dT%H:%i:%s.000Z'),
  'updated_at', DATE_FORMAT(updated_at, '%Y-%m-%dT%H:%i:%s.000Z')
)
FROM youtube_tokens
WHERE deleted_at IS NULL;
" > "$OUTPUT_DIR/youtube_tokens.jsonl"
TOKEN_COUNT=$(wc -l < "$OUTPUT_DIR/youtube_tokens.jsonl")
echo "  -> $TOKEN_COUNT records"

# operation_logs (soft delete除外)
echo "Exporting operation_logs..."
$MYSQL_CMD --batch --raw -e "
SELECT JSON_OBJECT(
  'operation_cd', operation_cd,
  'operation_nm', operation_nm,
  'execution_cnt', IFNULL(execution_cnt, 0),
  'updated_at', DATE_FORMAT(updated_at, '%Y-%m-%dT%H:%i:%s.000Z')
)
FROM operation_logs
WHERE deleted_at IS NULL;
" > "$OUTPUT_DIR/operation_logs.jsonl"
LOG_COUNT=$(wc -l < "$OUTPUT_DIR/operation_logs.jsonl")
echo "  -> $LOG_COUNT records"

echo ""
echo "=== Export complete ==="
echo "Output directory: $OUTPUT_DIR/"
echo "  users.jsonl          ($USER_COUNT records)"
echo "  comparisons.jsonl    ($COMP_COUNT records)"
echo "  youtube_tokens.jsonl ($TOKEN_COUNT records)"
echo "  operation_logs.jsonl ($LOG_COUNT records)"
echo ""
echo "次のステップ: このディレクトリをローカルにダウンロードして import-to-dynamodb.ts を実行してください"
