# 開発するプロジェクトの概要

このプロジェクトで利用可能なnpmコマンドは@package.jsonを参照してください。

# 実装方針

## 基本的な考え方

@rules/common/00_base.md

## コーディングプラクティス

@rules/common/coding.md

## gitワークフロー

@rules/common/git.md

## テスト駆動開発 (TDD)

@rules/common/tdd.md

## TypeScript

@rules/common/typescript.md

## Next.js/React

@rules/common/nextjs.md

## 利用ライブラリの扱い方について

最新のNext.js、Node.js、その他のライブラリは、`use context7` MCPで確認してください。

## アプリケーション構成と機能マッピング

主要画面と実装機能

1. ホームページ（/）

Partial Prerendering (PPR): 静的なヘッダー・フッターと動的なトレンド記事セクション
https://nextjs.org/docs/app/api-reference/config/next-config-js/ppr

Streaming: 人気記事リストの段階的読み込み
https://nextjs.org/docs/app/getting-started/linking-and-navigating#streaming

2. 記事一覧ページ（/articles）

Data Fetching (Collocation): Server Component内でのモックデータ取得
https://nextjs.org/docs/app/getting-started/fetching-data

Composition Patterns: カテゴリフィルターと記事リストの並列データフェッチ
https://nextjs.org/docs/app/guides/production-checklist#routing-and-rendering
https://zenn.dev/akfm/books/nextjs-basic-principle/viewer/part_2_composition_pattern

Suspense: カテゴリ別記事の個別ローディング
https://zenn.dev/akfm/books/nextjs-basic-principle/viewer/part_4_suspense_and_streaming

3. 記事詳細ページ（/articles/[slug]）

キャッシュ戦略: 記事本文の積極的キャッシュと関連記事の時間ベース再検証
https://nextjs.org/docs/app/guides/caching

Streaming: コメントセクションの遅延読み込み
https://zenn.dev/akfm/books/nextjs-basic-principle/viewer/part_4_suspense_and_streaming

4. 分析ダッシュボード（/dashboard）

並列データフェッチ: PV数、UU数、人気記事の同時取得
https://zenn.dev/akfm/books/nextjs-basic-principle/viewer/part_1_concurrent_fetch

Suspense境界: グラフ、テーブル、メトリクスカードの個別ストリーミング
https://zenn.dev/akfm/books/nextjs-basic-principle/viewer/part_4_suspense_and_streaming

5. 検索ページ（/search）

Client Components: リアルタイム検索フォーム
Server Actions: 検索結果の動的更新

## ディレクトリ構造

```
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx              # PPR実装
│   │   │   ├── articles/
│   │   │   │   ├── loading.tsx
│   │   │   │   ├── page.tsx          # Suspense + Streaming
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx      # キャッシュ戦略
│   │   │   └── search/
│   │   │       └── page.tsx
│   │   ├── (admin)/
│   │   │   ├── layout.tsx
│   │   │   └── dashboard/
│   │   │       ├── loading.tsx
│   │   │       └── page.tsx          # 並列データフェッチ
│   │   ├── api/
│   │   │   ├── articles/
│   │   │   └── analytics/
│   │   └── error.tsx
│   ├── components/
│   │   ├── ui/
│   │   │   ├── ArticleCard.tsx
│   │   │   └── MetricsCard.tsx
│   │   │   └── ... (以降、必要に応じてコンポーネント作成)
│   │   └── features/
│   │       ├── ArticleList.tsx
│   │       └── SearchForm.tsx
│   │       └── ... (以降、必要に応じてコンポーネント作成)
│   └── lib/
│       ├── mock-db.ts               # インメモリDB
│       └── data-fetchers.ts
```
