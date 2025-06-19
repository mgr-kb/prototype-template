import { unstable_cache } from 'next/cache';
import { db } from './mock-db';

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
