# Project Bolt

このプロジェクトは、Next.js 13.5.1 を使用したモダンなウェブアプリケーションです。Radix UI コンポーネントと Tailwind CSS を採用し、TypeScript で実装されています。

## 使用技術

### フロントエンドフレームワーク

- **Next.js 13.5.1**
  - React フレームワーク
  - App Router アーキテクチャ採用
  - SWC による高速なコンパイル
- **React 18.2.0**
  - モダンな UI 開発のための JavaScript ライブラリ
- **TypeScript 5.2.2**
  - 静的型付けによる型安全性の確保
  - 開発時のエラー検出強化

### スタイリング

- **Tailwind CSS 3.3.3**
  - ユーティリティファーストな CSS フレームワーク
  - カスタマイズ可能なデザインシステム
- **tailwindcss-animate**
  - Tailwind CSS 用アニメーション拡張
- **PostCSS & Autoprefixer**
  - モダンな CSS 機能の活用
  - ブラウザ互換性の自動管理

### UI コンポーネント

- **shadcn/ui**
  - モダンで再利用可能な UI コンポーネント集
- **Radix UI**
  - アクセシビリティ対応のプリミティブコンポーネント
  - 堅牢なインタラクション処理
- **Lucide React**
  - 美しく一貫性のあるアイコンライブラリ
- **class-variance-authority**
  - コンポーネントのスタイルバリアント管理
- **clsx & tailwind-merge**
  - 効率的な条件付きクラス名の結合
  - Tailwind クラスの最適化

### フォームとバリデーション

- **React Hook Form**
  - パフォーマンスを重視したフォーム制御
- **Zod**
  - 型安全なバリデーションスキーマ
- **@hookform/resolvers**
  - React Hook Form と Zod の連携

### UI/UX 機能

- **date-fns**
  - 日付操作ライブラリ
- **cmdk**
  - コマンドパレットインターフェース
- **vaul**
  - モダンなドロワーコンポーネント
- **sonner**
  - スタイリッシュなトースト通知

### 開発ツール

- **ESLint**
  - コード品質とスタイルの一貫性確保
- **Next.js SWC**
  - 高速な JavaScript/TypeScript コンパイル

### デプロイメント設定

- **Static Export**
  - 静的サイト生成（SSG）対応
- **Image Optimization**
  - 静的デプロイ向けに最適化

## 必要要件

- Node.js 16.x 以上
- npm または yarn

## セットアップ手順

1. リポジトリをクローンまたはダウンロードします：

   ```bash
   git clone [リポジトリURL]
   cd project
   ```

2. 依存パッケージをインストールします：

   ```bash
   npm install
   # または
   yarn install
   ```

3. 開発サーバーを起動します：

   ```bash
   npm run dev
   # または
   yarn dev
   ```

4. ブラウザで http://localhost:3000 を開きます。

## 利用可能なスクリプト

- `npm run dev` - 開発サーバーを起動します
- `npm run build` - プロダクション用にアプリケーションをビルドします
- `npm run start` - プロダクションモードでアプリケーションを起動します
- `npm run lint` - ESLint によるコード検証を実行します

## プロジェクト構造

```
project/
├── app/                    # Next.js アプリケーションのメインディレクトリ
│   ├── layout.tsx         # アプリケーション全体のレイアウト定義
│   ├── page.tsx          # メインページのコンポーネント
│   └── globals.css       # グローバルスタイル定義
│
├── components/            # 再利用可能な React コンポーネント
│   └── ui/              # UI コンポーネントライブラリ
│       ├── accordion.tsx   # アコーディオンコンポーネント
│       ├── alert.tsx      # アラートコンポーネント
│       ├── button.tsx     # ボタンコンポーネント
│       ├── form.tsx       # フォームコンポーネント
│       └── ...           # その他の UI コンポーネント
│
├── hooks/                 # カスタム React フック
│   └── use-toast.ts      # トースト通知用のカスタムフック
│
├── lib/                   # ユーティリティ関数や共通ロジック
│   └── utils.ts          # 共通のユーティリティ関数
│
├── .next/                # Next.js ビルド出力ディレクトリ
├── .bolt/               # Bolt 関連の設定ディレクトリ
│
└── 設定ファイル
    ├── next.config.js    # Next.js の設定
    ├── tailwind.config.ts # Tailwind CSS の設定
    ├── tsconfig.json     # TypeScript の設定
    ├── postcss.config.js # PostCSS の設定
    └── .eslintrc.json   # ESLint の設定
```

### ディレクトリの役割

#### `app/`

Next.js 13 の App Router を使用したメインアプリケーションディレクトリです。

- `layout.tsx`: アプリケーション全体の共通レイアウトを定義
- `page.tsx`: メインページのコンポーネントを実装
- `globals.css`: アプリケーション全体で使用するグローバルスタイル

#### `components/`

再利用可能な React コンポーネントを格納するディレクトリです。

- `ui/`: Radix UI ベースの基本的な UI コンポーネントライブラリ
  - フォーム要素（input, select, checkbox 等）
  - ナビゲーション要素（menu, tabs 等）
  - フィードバック要素（alert, toast 等）
  - レイアウト要素（accordion, card 等）
  - その他のインタラクティブ要素

#### `hooks/`

カスタム React フックを格納するディレクトリです。

- `use-toast.ts`: トースト通知機能を提供するカスタムフック

#### `lib/`

ユーティリティ関数や共通ロジックを格納するディレクトリです。

- `utils.ts`: 共通で使用するユーティリティ関数

#### `.next/`

Next.js によって生成されるビルド出力とキャッシュを含むディレクトリです。

#### `.bolt/`

Bolt 関連の設定や機能を管理するディレクトリです。

#### 設定ファイル

- `next.config.js`: Next.js の設定（ビルド設定、環境変数等）
- `tailwind.config.ts`: Tailwind CSS のカスタマイズ設定
- `tsconfig.json`: TypeScript のコンパイラ設定
- `postcss.config.js`: PostCSS のプラグイン設定
- `.eslintrc.json`: ESLint のコード品質チェック設定

## 環境設定

プロジェクトは以下の設定ファイルを使用します：

- `next.config.js` - Next.js の設定
- `tailwind.config.ts` - Tailwind CSS の設定
- `tsconfig.json` - TypeScript の設定
- `postcss.config.js` - PostCSS の設定
- `.eslintrc.json` - ESLint の設定

## 起動方法

### 開発環境での起動

開発時は以下のコマンドを使用します：

```bash
npm run dev
# または
yarn dev
```

このモードでは、ホットリロードが有効で、コードの変更が即座に反映されます。

### 本番環境での起動

本番環境で実行する場合は、以下の手順で行います：

1. アプリケーションをビルドします：

   ```bash
   npm run build
   # または
   yarn build
   ```

2. ビルドしたアプリケーションを起動します：
   ```bash
   npm run start
   # または
   yarn start
   ```

本番環境では、コードが最適化され、より高いパフォーマンスで動作します。
デフォルトでは http://localhost:3000 でアクセス可能です。

## ライセンス

このプロジェクトはプライベートリポジトリとして管理されています。

## 他の環境での利用方法

1. GitHub からプロジェクトをダウンロード：

   - リポジトリページの "Code" ボタンをクリック
   - "Download ZIP" を選択してダウンロード
   - または、git clone コマンドを使用：
     ```bash
     git clone [リポジトリのURL]
     ```

2. プロジェクトディレクトリに移動：

   ```bash
   cd [プロジェクト名]
   ```

3. 依存パッケージのインストール：

   ```bash
   npm install
   # または
   yarn install
   ```

4. 開発サーバーの起動：

   ```bash
   npm run dev
   # または
   yarn dev
   ```

5. ブラウザで http://localhost:3000 を開く

注意：

- Node.js 16.x 以上が必要です
- プロジェクトの初回セットアップには数分かかる場合があります
- `npm install` 実行時にエラーが発生した場合は、Node.js のバージョンを確認してください
