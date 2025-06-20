import type { Article, Comment, AnalyticsMetrics, Category } from './types';
import {
  generateMockArticles,
  generateMockComments,
  generateMockAnalytics,
  CATEGORIES,
} from './mock-data-generators';

class MockDatabase {
  private articles: Article[];
  private comments: Comment[];
  private analytics: AnalyticsMetrics;
  private requestLog: Array<{
    method: string;
    params: unknown;
    timestamp: number;
  }> = [];

  constructor() {
    // 初期データを生成
    console.log('Initializing mock database...');
    this.articles = generateMockArticles(50);
    this.comments = generateMockComments(50);
    this.analytics = generateMockAnalytics();
    console.log('Mock database initialized with', {
      articles: this.articles.length,
      comments: this.comments.length,
    });
  }

  private logRequest(method: string, params: unknown = {}) {
    const timestamp = Date.now();
    this.requestLog.push({ method, params, timestamp });
    console.log(
      `[DB REQUEST] ${method}`,
      params,
      `at ${new Date(timestamp).toISOString()}`
    );
  }

  getRequestLog() {
    return [...this.requestLog];
  }

  clearRequestLog() {
    this.requestLog = [];
  }

  // 記事関連のメソッド
  async findArticles(options?: {
    category?: string;
    limit?: number;
    offset?: number;
    featured?: boolean;
    delay?: number;
  }): Promise<Article[]> {
    this.logRequest('findArticles', options);

    // 遅延をシミュレート
    if (options?.delay) {
      await new Promise((resolve) => setTimeout(resolve, options.delay));
    }

    let results = [...this.articles];

    // カテゴリでフィルタ
    if (options?.category) {
      results = results.filter((a) => a.category.slug === options.category);
    }

    // featuredでフィルタ
    if (options?.featured !== undefined) {
      results = results.filter((a) => a.featured === options.featured);
    }

    // ページネーション
    const offset = options?.offset || 0;
    const limit = options?.limit || 10;
    results = results.slice(offset, offset + limit);

    return results;
  }

  async findArticleBySlug(
    slug: string,
    delay?: number
  ): Promise<Article | null> {
    if (delay) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    return this.articles.find((a) => a.slug === slug) || null;
  }

  async findTrendingArticles(limit: number = 5): Promise<Article[]> {
    // ビュー数でソートしてトップnを返す
    return [...this.articles]
      .sort((a, b) => b.viewCount - a.viewCount)
      .slice(0, limit);
  }

  // コメント関連のメソッド
  async findCommentsByArticle(
    articleId: string,
    delay?: number
  ): Promise<Comment[]> {
    if (delay) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    return this.comments.filter((c) => c.articleId === articleId);
  }

  async getRecentComments(limit: number = 10): Promise<Comment[]> {
    return [...this.comments]
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  // アナリティクス関連のメソッド
  async getAnalytics(delay?: number): Promise<AnalyticsMetrics> {
    if (delay) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    return { ...this.analytics };
  }

  async getTopArticles(
    limit: number = 10
  ): Promise<Array<Article & { views: number }>> {
    return [...this.articles]
      .sort((a, b) => b.viewCount - a.viewCount)
      .slice(0, limit)
      .map((article) => ({
        ...article,
        views: article.viewCount,
      }));
  }

  // カテゴリ関連のメソッド
  async getCategories(): Promise<Category[]> {
    this.logRequest('getCategories');
    // CATEGORIESを返す（実際のDBでは別テーブルから取得）
    return CATEGORIES;
  }

  async getCategoryStats(): Promise<
    Array<{ category: Category; count: number }>
  > {
    this.logRequest('getCategoryStats');
    const stats = new Map<string, number>();

    this.articles.forEach((article) => {
      const count = stats.get(article.category.id) || 0;
      stats.set(article.category.id, count + 1);
    });

    return CATEGORIES.map((category) => ({
      category,
      count: stats.get(category.id) || 0,
    }));
  }

  async getTotalArticleCount(options?: { category?: string }): Promise<number> {
    this.logRequest('getTotalArticleCount', options);
    let articles = this.articles;
    if (options?.category) {
      articles = articles.filter((a) => a.category.slug === options.category);
    }
    return articles.length;
  }

  async incrementViewCount(articleId: string): Promise<void> {
    const article = this.articles.find((a) => a.id === articleId);
    if (article) {
      article.viewCount += 1;
    }
  }

  async getPopularTags(
    limit: number
  ): Promise<Array<{ tag: string; count: number }>> {
    const tagCounts = new Map<string, number>();

    this.articles.forEach((article) => {
      article.tags.forEach((tag) => {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
      });
    });

    return Array.from(tagCounts.entries())
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    return CATEGORIES.find((c) => c.slug === slug) || null;
  }

  async searchArticles(
    query: string,
    options?: { category?: string }
  ): Promise<Article[]> {
    const lowercaseQuery = query.toLowerCase();
    let results = this.articles.filter(
      (article) =>
        article.title.toLowerCase().includes(lowercaseQuery) ||
        article.excerpt.toLowerCase().includes(lowercaseQuery) ||
        article.content.toLowerCase().includes(lowercaseQuery) ||
        article.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
    );

    if (options?.category) {
      results = results.filter((a) => a.category.slug === options.category);
    }

    return results;
  }

  async findRelatedArticles(
    articleId: string,
    limit: number = 4,
    delay?: number
  ): Promise<Article[]> {
    this.logRequest('findRelatedArticles', { articleId, limit });

    if (delay) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    const currentArticle = this.articles.find((a) => a.id === articleId);
    if (!currentArticle) {
      return [];
    }

    // スコアベースで関連記事を選択
    const relatedArticles = this.articles
      .filter((article) => article.id !== articleId)
      .map((article) => {
        let score = 0;

        // 同じカテゴリ：高スコア
        if (article.category.id === currentArticle.category.id) {
          score += 10;
        }

        // 共通タグ：タグ数に応じてスコア
        const commonTags = article.tags.filter((tag) =>
          currentArticle.tags.includes(tag)
        );
        score += commonTags.length * 5;

        // 同じ著者：中スコア
        if (article.author.id === currentArticle.author.id) {
          score += 3;
        }

        return { article, score };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(({ article }) => article);

    return relatedArticles;
  }
}

// シングルトンインスタンスをエクスポート
export const db = new MockDatabase();
