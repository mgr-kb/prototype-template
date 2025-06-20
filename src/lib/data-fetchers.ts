import { unstable_cache, unstable_cacheLife } from 'next/cache';
import { cache } from 'react';
import { db } from './mock-db';
import type { Article, Category, Comment } from './types';

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

// カテゴリー一覧を取得する（React cache使用でDeduplicating Requests）
const getCategoriesFromDB = cache(async (): Promise<Category[]> => {
  console.log(
    '[CACHE] getCategoriesFromDB called - this should only appear once per request'
  );
  return await db.getCategories();
});

export async function fetchCategories(): Promise<Category[]> {
  return await getCategoriesFromDB();
}

// カテゴリー別の記事数を取得する（React cache使用でDeduplicating Requests）
const getCategoryStatsFromDB = cache(
  async (): Promise<Array<{ category: Category; count: number }>> => {
    console.log(
      '[CACHE] getCategoryStatsFromDB called - this should only appear once per request'
    );
    return await db.getCategoryStats();
  }
);

export async function fetchCategoryStats(): Promise<
  Array<{ category: Category; count: number }>
> {
  return await getCategoryStatsFromDB();
}

// ページネーション対応で記事を取得する
export async function fetchArticlesWithPagination(options?: {
  page?: number;
  limit?: number;
}): Promise<Article[]> {
  const page = options?.page || 1;
  const limit = options?.limit || 12;
  const offset = (page - 1) * limit;

  return await db.findArticles({
    offset,
    limit,
  });
}

// カテゴリ別記事を取得する（ページネーション付き）
export async function fetchArticlesByCategory(
  categorySlug: string,
  options?: {
    page?: number;
    limit?: number;
  }
): Promise<Article[]> {
  const page = options?.page || 1;
  const limit = options?.limit || 12;
  const offset = (page - 1) * limit;

  return await db.findArticles({
    category: categorySlug,
    offset,
    limit,
  });
}

// 記事総数を取得する
export async function fetchTotalArticleCount(
  categorySlug?: string
): Promise<number> {
  return await db.getTotalArticleCount(
    categorySlug ? { category: categorySlug } : undefined
  );
}

// Deduplicating Requests の比較用関数

// React cache を使わない版（重複リクエストが発生する）
export async function fetchCategoriesNoDedupe(): Promise<Category[]> {
  console.log(
    '[NO DEDUPE] fetchCategoriesNoDedupe called - this will appear multiple times'
  );
  return await db.getCategories();
}

export async function fetchCategoryStatsNoDedupe(): Promise<
  Array<{ category: Category; count: number }>
> {
  console.log(
    '[NO DEDUPE] fetchCategoryStatsNoDedupe called - this will appear multiple times'
  );
  return await db.getCategoryStats();
}

// 関連記事を取得する（時間ベースキャッシュ付き）
export async function getRelatedArticles(articleId: string, limit: number = 4) {
  'use cache';

  // 30分間隔で再検証（1800秒 = 30分）
  unstable_cacheLife({
    stale: 1800, // 30分後にstaleとみなす
    revalidate: 900, // 15分後に再検証開始
    expire: 3600, // 1時間後に完全期限切れ
  });

  return await db.findRelatedArticles(articleId, limit);
}

// コメントを取得する（Streaming対応）
export async function getComments(
  articleId: string,
  delay: number = 2000
): Promise<Comment[]> {
  // Streamingのために遅延を追加
  console.log(
    `[STREAMING] Getting comments for article ${articleId} with ${delay}ms delay`
  );
  return await db.findCommentsByArticle(articleId, delay);
}
