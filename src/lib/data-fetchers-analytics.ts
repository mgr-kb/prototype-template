import { cache } from 'react';
import { db } from './mock-db';
import type { AnalyticsMetrics, Article } from './types';

// 分析メトリクスを取得する（React cache使用でDeduplicating Requests）
const getAnalyticsMetricsFromDB = cache(
  async (delay?: number): Promise<AnalyticsMetrics> => {
    console.log(
      '[CACHE] getAnalyticsMetricsFromDB called - this should only appear once per request'
    );
    return await db.getAnalytics(delay);
  }
);

export async function fetchAnalyticsMetrics(
  delay?: number
): Promise<AnalyticsMetrics> {
  return await getAnalyticsMetricsFromDB(delay);
}

// 人気記事を取得する（React cache使用でDeduplicating Requests）
const getTopArticlesFromDB = cache(
  async (
    limit: number = 10,
    delay?: number
  ): Promise<Array<Article & { views: number }>> => {
    console.log(
      '[CACHE] getTopArticlesFromDB called - this should only appear once per request'
    );

    if (delay) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    return await db.getTopArticles(limit);
  }
);

export async function fetchTopArticles(
  limit: number = 10,
  delay?: number
): Promise<Array<Article & { views: number }>> {
  return await getTopArticlesFromDB(limit, delay);
}

// ダッシュボード用の並列データフェッチ
export async function fetchDashboardData(options?: {
  topArticlesLimit?: number;
  analyticsDelay?: number;
  topArticlesDelay?: number;
}): Promise<{
  analytics: AnalyticsMetrics;
  topArticles: Array<Article & { views: number }>;
}> {
  const {
    topArticlesLimit = 10,
    analyticsDelay = 100,
    topArticlesDelay = 100,
  } = options || {};

  // 並列データフェッチ
  const [analytics, topArticles] = await Promise.all([
    fetchAnalyticsMetrics(analyticsDelay),
    fetchTopArticles(topArticlesLimit, topArticlesDelay),
  ]);

  return {
    analytics,
    topArticles,
  };
}
