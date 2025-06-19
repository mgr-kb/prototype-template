import { unstable_cache } from 'next/cache';
import { db } from './mock-db';
import type { Article, Category } from './types';

// "use cache"指令を使用した新しいキャッシュAPI
export async function getArticle(slug: string) {
  'use cache';

  // モックデータベースから記事を取得
  const article = await db.findArticleBySlug(slug);
  return article;
}

// 時間ベースの再検証
export const getTrendingArticles = unstable_cache(
  async () => {
    return await db.findTrendingArticles();
  },
  ['trending-articles'],
  { revalidate: 3600 } // 1時間ごとに更新
);

// トレンド記事を取得する（ホームページ用）
export async function fetchTrendingArticles(
  limit: number = 5
): Promise<Article[]> {
  // PPRのために若干の遅延を入れて動的な振る舞いをシミュレート
  return await db.findTrendingArticles(limit);
}

// 人気記事を取得する（ホームページ用・ストリーミング対応）
export async function fetchPopularArticles(
  limit: number = 10
): Promise<Article[]> {
  // ストリーミングのために意図的に遅延を入れる
  return await db.findArticles({
    featured: true,
    limit,
    delay: 1500, // 1.5秒の遅延でストリーミングをシミュレート
  });
}

// 最新記事を取得する
export async function fetchLatestArticles(
  limit: number = 10
): Promise<Article[]> {
  return await db.findArticles({ limit });
}

// カテゴリー一覧を取得する
export async function fetchCategories(): Promise<Category[]> {
  return await db.getCategories();
}

// カテゴリー別の記事数を取得する
export async function fetchCategoryStats(): Promise<
  Array<{ category: Category; count: number }>
> {
  return await db.getCategoryStats();
}
