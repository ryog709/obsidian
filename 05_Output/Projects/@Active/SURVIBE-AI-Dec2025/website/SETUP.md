# セットアップガイド

## 1. 依存関係のインストール

```bash
cd website
npm install
```

## 2. 環境変数の設定

`.env.local`ファイルをプロジェクトルート（`website/`ディレクトリ）に作成し、以下の内容を設定してください：

```bash
# MongoDB接続文字列（実際の値に置き換える）
MONGODB_URI=mongodb+srv://survibe-user:your-password-here@cluster0.xxxxx.mongodb.net/survibe-ai?retryWrites=true&w=majority

# サイトURL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 具体的な値の例

**MongoDB Atlasから取得した接続文字列の例:**

```
mongodb+srv://survibe-user:MyPassword123@cluster0.abc123.mongodb.net/survibe-ai?retryWrites=true&w=majority
```

**各部分の説明:**
- `survibe-user`: データベースユーザー名（MongoDB Atlasで作成したユーザー名）
- `MyPassword123`: データベースパスワード（MongoDB Atlasで設定したパスワード）
- `cluster0.abc123`: クラスター名（MongoDB Atlasで表示されるクラスター名）
- `survibe-ai`: データベース名（任意の名前、存在しない場合は自動作成）

### MongoDB Atlasのセットアップ

詳細な手順は `MONGODB_SETUP.md` を参照してください。

**簡単な手順:**
1. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)にアクセス
2. 無料アカウントを作成（またはログイン）
3. クラスターを作成（FREEプランでOK）
4. Database Accessでユーザーを作成（ユーザー名とパスワードをメモ）
5. Network AccessでIPアドレスを許可（開発環境では`0.0.0.0/0`で全許可可能）
6. Database → Connect → 「Connect your application」を選択
7. 接続文字列をコピーし、以下のように編集:
   - `<username>`を実際のユーザー名に置き換え
   - `<password>`を実際のパスワードに置き換え
   - `/?retryWrites=true&w=majority`を`/survibe-ai?retryWrites=true&w=majority`に変更（データベース名を追加）

## 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて確認してください。

## 4. 動作確認

1. ランディングページが表示されることを確認
2. コース情報が正しく表示されることを確認
3. お問い合わせフォームからデータを送信
4. MongoDBにデータが保存されていることを確認

## トラブルシューティング

### MongoDB接続エラー

- `.env.local`ファイルが正しい場所にあるか確認
- MongoDB Atlasの接続文字列が正しいか確認
- Network AccessでIPアドレスが許可されているか確認

### パッケージインストールエラー

```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScriptエラー

```bash
npm run build
```

でビルドエラーを確認してください。

## 次のステップ

- [ ] デザインのカスタマイズ
- [ ] 追加のセクション実装
- [ ] メール通知機能の追加
- [ ] 管理画面の実装（オプション）

