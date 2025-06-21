import { describe, it, expect, beforeEach, vi } from 'vitest';
import { db } from './mock-db';
import {
  fetchAnalyticsMetrics,
  fetchTopArticles,
  fetchDashboardData,
} from './data-fetchers-analytics';

describe('分析データフェッチャー', () => {
  beforeEach(() => {
    db.clearRequestLog();
    // Reactキャッシュをクリアするため、モジュールをリセット
    vi.resetModules();
  });

  describe('fetchAnalyticsMetrics', () => {
    it('分析メトリクスを取得できること', async () => {
      const metrics = await fetchAnalyticsMetrics();

      expect(metrics).toBeDefined();
      expect(metrics.totalViews).toBeTypeOf('number');
      expect(metrics.uniqueVisitors).toBeTypeOf('number');
      expect(metrics.avgSessionDuration).toBeTypeOf('number');
      expect(metrics.bounceRate).toBeTypeOf('number');
      expect(Array.isArray(metrics.topReferrers)).toBe(true);
      expect(Array.isArray(metrics.viewsByDate)).toBe(true);
    });

    it('遅延パラメータが指定された場合、適切に遅延すること', async () => {
      const startTime = performance.now();
      await fetchAnalyticsMetrics(50);
      const endTime = performance.now();
      const duration = endTime - startTime;

      // 多少のマージンを考慮（±10ms）
      expect(duration).toBeGreaterThan(40);
      expect(duration).toBeLessThan(200);
    });
  });

  describe('fetchTopArticles', () => {
    it('人気記事のリストを取得できること', async () => {
      const articles = await fetchTopArticles();

      expect(Array.isArray(articles)).toBe(true);
      expect(articles.length).toBeGreaterThan(0);

      // ビュー数の降順でソートされていることを確認
      for (let i = 0; i < articles.length - 1; i++) {
        expect(articles[i].views).toBeGreaterThanOrEqual(articles[i + 1].views);
      }

      // 各記事にviewsプロパティが存在することを確認
      articles.forEach((article) => {
        expect(article).toHaveProperty('views');
        expect(typeof article.views).toBe('number');
        expect(article.views).toBeGreaterThanOrEqual(0);
      });
    });

    it('limit パラメータが正しく動作すること', async () => {
      const articles = await fetchTopArticles(3);

      expect(articles.length).toBeLessThanOrEqual(3);
    });

    it('遅延パラメータが指定された場合、適切に遅延すること', async () => {
      const startTime = performance.now();
      await fetchTopArticles(5, 50);
      const endTime = performance.now();
      const duration = endTime - startTime;

      // 多少のマージンを考慮（±10ms）
      expect(duration).toBeGreaterThan(40);
      expect(duration).toBeLessThan(200);
    });
  });

  describe('fetchDashboardData', () => {
    it('並列データフェッチが正しく動作すること', async () => {
      const startTime = performance.now();
      const result = await fetchDashboardData({
        analyticsDelay: 30,
        topArticlesDelay: 30,
      });
      const endTime = performance.now();
      const duration = endTime - startTime;

      // 並列実行により、個別実行より高速であることを確認
      // (30ms + 30ms = 60ms の逐次実行より速い)
      expect(duration).toBeLessThan(50); // 並列実行なので30ms程度
      expect(duration).toBeGreaterThan(25); // 最低でも一番長い処理時間は必要

      expect(result.analytics).toBeDefined();
      expect(result.topArticles).toBeDefined();
      expect(Array.isArray(result.topArticles)).toBe(true);
    });

    it('返されるデータの構造が正しいこと', async () => {
      const result = await fetchDashboardData();

      expect(result).toHaveProperty('analytics');
      expect(result).toHaveProperty('topArticles');
      expect(result.analytics).toHaveProperty('totalViews');
      expect(result.analytics).toHaveProperty('uniqueVisitors');
      expect(result.topArticles.length).toBeGreaterThan(0);
    });
  });

  describe('エラーケース', () => {
    it('fetchAnalyticsMetricsは常に成功する（モックDBを使用）', async () => {
      // モックDBは常に成功するため、エラーケースのテストは実際のDB接続時のみ有効
      const result = await fetchAnalyticsMetrics();
      expect(result).toBeDefined();
      expect(result.totalViews).toBeTypeOf('number');
    });

    it('fetchTopArticlesは空の結果でも正常に動作する', async () => {
      // limit=0の場合
      const articles = await fetchTopArticles(0);
      expect(Array.isArray(articles)).toBe(true);
      expect(articles.length).toBe(0);
    });

    it('fetchDashboardDataは部分的なオプションでも正常に動作する', async () => {
      const result = await fetchDashboardData({
        topArticlesLimit: 3,
        // 他のオプションはデフォルト値を使用
      });

      expect(result.analytics).toBeDefined();
      expect(result.topArticles).toBeDefined();
      expect(result.topArticles.length).toBeLessThanOrEqual(3);
    });
  });
});
