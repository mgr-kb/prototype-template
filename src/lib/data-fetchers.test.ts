import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  fetchArticlesWithPagination,
  fetchArticlesByCategory,
  fetchTotalArticleCount,
} from './data-fetchers';
import { db } from './mock-db';

// モックDB関数をモック化
vi.mock('./mock-db', () => ({
  db: {
    findArticles: vi.fn(),
    getTotalArticleCount: vi.fn(),
  },
}));

const mockDb = vi.mocked(db);

describe('data-fetchers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchArticlesWithPagination', () => {
    it('正しいページネーションパラメータで記事を取得すること', async () => {
      // Arrange
      const mockArticles = [
        { id: '1', title: 'Article 1' },
        { id: '2', title: 'Article 2' },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ] as any[];
      mockDb.findArticles.mockResolvedValue(mockArticles);

      // Act
      const result = await fetchArticlesWithPagination({ page: 2, limit: 12 });

      // Assert
      expect(mockDb.findArticles).toHaveBeenCalledWith({
        offset: 12, // (page - 1) * limit
        limit: 12,
      });
      expect(result).toEqual(mockArticles);
    });

    it('デフォルトパラメータで動作すること', async () => {
      // Arrange
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mockArticles = [{ id: '1', title: 'Article 1' }] as any[];
      mockDb.findArticles.mockResolvedValue(mockArticles);

      // Act
      const result = await fetchArticlesWithPagination();

      // Assert
      expect(mockDb.findArticles).toHaveBeenCalledWith({
        offset: 0,
        limit: 12,
      });
      expect(result).toEqual(mockArticles);
    });
  });

  describe('fetchArticlesByCategory', () => {
    it('カテゴリとページネーションで記事を取得すること', async () => {
      // Arrange
      const mockArticles = [
        { id: '1', title: 'Tech Article', category: { slug: 'tech' } },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ] as any[];
      mockDb.findArticles.mockResolvedValue(mockArticles);

      // Act
      const result = await fetchArticlesByCategory('tech', {
        page: 1,
        limit: 10,
      });

      // Assert
      expect(mockDb.findArticles).toHaveBeenCalledWith({
        category: 'tech',
        offset: 0,
        limit: 10,
      });
      expect(result).toEqual(mockArticles);
    });

    it('カテゴリのみで記事を取得すること', async () => {
      // Arrange
      const mockArticles = [
        { id: '1', title: 'Design Article', category: { slug: 'design' } },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ] as any[];
      mockDb.findArticles.mockResolvedValue(mockArticles);

      // Act
      const result = await fetchArticlesByCategory('design');

      // Assert
      expect(mockDb.findArticles).toHaveBeenCalledWith({
        category: 'design',
        offset: 0,
        limit: 12,
      });
      expect(result).toEqual(mockArticles);
    });
  });

  describe('fetchTotalArticleCount', () => {
    it('全記事数を取得すること', async () => {
      // Arrange
      mockDb.getTotalArticleCount.mockResolvedValue(42);

      // Act
      const result = await fetchTotalArticleCount();

      // Assert
      expect(mockDb.getTotalArticleCount).toHaveBeenCalledWith(undefined);
      expect(result).toBe(42);
    });

    it('カテゴリ別記事数を取得すること', async () => {
      // Arrange
      mockDb.getTotalArticleCount.mockResolvedValue(15);

      // Act
      const result = await fetchTotalArticleCount('tech');

      // Assert
      expect(mockDb.getTotalArticleCount).toHaveBeenCalledWith({
        category: 'tech',
      });
      expect(result).toBe(15);
    });
  });
});
