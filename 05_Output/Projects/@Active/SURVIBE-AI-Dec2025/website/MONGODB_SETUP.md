# MongoDB Atlas セットアップガイド

## 1. MongoDB Atlasアカウント作成

1. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)にアクセス
2. 「Try Free」をクリックして無料アカウントを作成
3. メールアドレスでサインアップ

## 2. クラスター作成

1. ログイン後、「Build a Database」をクリック
2. 「FREE」プランを選択（無料）
3. クラウドプロバイダーとリージョンを選択（例: AWS、Tokyo）
4. クラスター名を入力（例: `Cluster0`）
5. 「Create」をクリック

## 3. データベースユーザー作成

1. 「Database Access」をクリック
2. 「Add New Database User」をクリック
3. 認証方法を選択:
   - **Password**: ユーザー名とパスワードを設定
   - ユーザー名: 例 `survibe-user`
   - パスワード: 強力なパスワードを生成（メモしておく）
4. 「Add User」をクリック

## 4. ネットワークアクセス設定

1. 「Network Access」をクリック
2. 「Add IP Address」をクリック
3. 開発環境の場合:
   - 「Allow Access from Anywhere」を選択（`0.0.0.0/0`）
   - または、自分のIPアドレスを追加
4. 「Confirm」をクリック

## 5. 接続文字列の取得

1. 「Database」をクリック
2. 「Connect」ボタンをクリック
3. 「Connect your application」を選択
4. Driver: `Node.js`、Version: `5.5 or later`を選択
5. 接続文字列が表示されます:

```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

## 6. 接続文字列の編集

表示された接続文字列を以下のように編集します:

### 元の接続文字列:
```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

### 編集後の接続文字列:
```
mongodb+srv://survibe-user:your-password-here@cluster0.xxxxx.mongodb.net/survibe-ai?retryWrites=true&w=majority
```

**変更点:**
- `<username>` → 実際のユーザー名（例: `survibe-user`）
- `<password>` → 実際のパスワード
- `cluster0.xxxxx` → 実際のクラスター名
- `/?retryWrites=true&w=majority` → `/survibe-ai?retryWrites=true&w=majority`（データベース名を追加）

## 7. .env.localファイルの作成

プロジェクトの`website/`ディレクトリに`.env.local`ファイルを作成し、以下の内容を記述:

```bash
# MongoDB接続文字列（実際の値に置き換える）
MONGODB_URI=mongodb+srv://survibe-user:your-password-here@cluster0.xxxxx.mongodb.net/survibe-ai?retryWrites=true&w=majority

# サイトURL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 8. 接続テスト

開発サーバーを起動して、お問い合わせフォームからデータを送信し、MongoDB Atlasの「Browse Collections」でデータが保存されているか確認してください。

## 注意事項

⚠️ **セキュリティ:**
- `.env.local`ファイルは**絶対に**Gitにコミットしないでください
- `.gitignore`に`.env*`が含まれていることを確認してください
- 本番環境では、環境変数をVercelダッシュボードで設定してください

⚠️ **パスワードの特殊文字:**
- パスワードに特殊文字（`@`, `#`, `%`など）が含まれる場合、URLエンコードが必要です
- 例: `@` → `%40`, `#` → `%23`, `%` → `%25`

## トラブルシューティング

### 接続エラーが発生する場合

1. **ネットワークアクセスを確認**
   - MongoDB Atlasの「Network Access」でIPアドレスが許可されているか確認

2. **接続文字列を確認**
   - ユーザー名とパスワードが正しいか確認
   - データベース名（`survibe-ai`）が正しく含まれているか確認

3. **パスワードの特殊文字**
   - パスワードに特殊文字が含まれる場合、URLエンコードが必要

4. **クラスターの状態**
   - MongoDB Atlasでクラスターが起動しているか確認

