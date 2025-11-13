# SURVIBE AI 12月期お問い合わせサイト

Next.js + MongoDB + Mongoose + MUIを使用したお問い合わせフォーム付きランディングページ

## 技術スタック

- **Next.js 16**: App Router
- **TypeScript**: 型安全性
- **Material-UI (MUI)**: UIコンポーネント
- **React Hook Form**: フォーム管理
- **Zod**: バリデーション
- **MongoDB**: データベース
- **Mongoose**: MongoDB ODM

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.local`ファイルを作成し、以下の環境変数を設定してください：

```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/survibe-ai
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて確認してください。

## プロジェクト構造

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   └── contact/      # お問い合わせAPI
│   ├── layout.tsx         # ルートレイアウト
│   └── page.tsx          # ホームページ
├── components/            # Reactコンポーネント
│   ├── forms/            # フォームコンポーネント
│   └── sections/         # セクションコンポーネント
├── lib/                   # ユーティリティ・ライブラリ
│   ├── db/               # データベース関連
│   │   ├── mongoose.ts   # Mongoose接続
│   │   └── models/       # Mongooseモデル
│   └── constants/        # 定数
└── types/                # TypeScript型定義
```

## 機能

- ✅ ランディングページ
- ✅ コース情報表示
- ✅ お問い合わせフォーム
- ✅ MongoDBへのデータ保存
- ✅ フォームバリデーション
- ✅ レスポンシブデザイン

## デプロイ

### Vercel

1. GitHubにリポジトリをプッシュ
2. Vercelでプロジェクトをインポート
3. 環境変数を設定（MONGODB_URI, NEXT_PUBLIC_SITE_URL）
4. デプロイ

## ライセンス

Private
