import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  fetchArticlesWithPagination,
  fetchArticlesByCategory,
  fetchTotalArticleCount,
  fetchTrendingArticles,
  fetchPopularArticles,
  fetchLatestArticles,
  fetchCategories,
  fetchCategoryStats,
  getRelatedArticles,
  getComments,
  getArticle,
} from './data-fetchers';
import { db } from './mock-db';
import type { Article, Category, Comment } from './types';

// 完全なDBモックを作成
vi.mock('./mock-db', () => ({
  db: {
    findArticles: vi.fn(),
    getTotalArticleCount: vi.fn(),
    findTrendingArticles: vi.fn(),
    getCategories: vi.fn(),
    getCategoryStats: vi.fn(),
    findRelatedArticles: vi.fn(),
    findCommentsByArticle: vi.fn(),
    findArticleBySlug: vi.fn(),
  },
}));

// Next.jsキャッシュ関数のモック
vi.mock('next/cache', () => ({
  unstable_cache: vi.fn((fn) => fn),
  unstable_cacheLife: vi.fn(),
}));

vi.mock('react', () => ({
  cache: vi.fn((fn) => fn),
}));

const mockDb = vi.mocked(db);

describe('data-fetchers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // テストヘルパー関数
  const createMockArticle = (overrides: Partial<Article> = {}): Article => ({
    id: '1',
    slug: 'test-article',
    title: 'Test Article',
    excerpt: 'Test excerpt',
    content: 'Test content',
    author: {
      id: 'author1',
      name: 'Test Author',
      avatar: 'avatar.jpg',
      bio: 'Test bio',
      role: 'Writer',
    },
    category: {
      id: 'cat1',
      name: 'Tech',
      slug: 'tech',
      description: 'Tech category',
      color: 'bg-blue-100',
    },
    tags: ['tag1', 'tag2'],
    publishedAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    viewCount: 100,
    likeCount: 10,
    commentCount: 5,
    readingTime: 3,
    featured: false,
    ...overrides,
  });

  const createMockCategory = (overrides: Partial<Category> = {}): Category => ({
    id: 'cat1',
    name: 'Tech',
    slug: 'tech',
    description: 'Tech category',
    color: 'bg-blue-100',
    ...overrides,
  });

  const createMockComment = (overrides: Partial<Comment> = {}): Comment => ({
    id: '1',
    articleId: 'test-article',
    author: 'Test User',
    content: 'Test comment',
    createdAt: new Date('2024-01-01'),
    likes: 5,
    ...overrides,
  });

  describe('fetchArticlesWithPagination', () => {
    it('正しいページネーションパラメータで記事を取得すること', async () => {
      // Arrange
      const mockArticles = [
        createMockArticle({ id: '1' }),
        createMockArticle({ id: '2' }),
      ];
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
      const mockArticles = [createMockArticle()];
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

    it('エラーが発生した場合は例外を投げること', async () => {
      // Arrange
      const error = new Error('Database error');
      mockDb.findArticles.mockRejectedValue(error);

      // Act & Assert
      await expect(fetchArticlesWithPagination()).rejects.toThrow(
        'Database error'
      );
    });
  });

  describe('fetchArticlesByCategory', () => {
    it('カテゴリとページネーションで記事を取得すること', async () => {
      // Arrange
      const mockArticles = [
        createMockArticle({
          category: { ...createMockCategory(), slug: 'tech' },
        }),
      ];
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
        createMockArticle({
          category: { ...createMockCategory(), slug: 'design' },
        }),
      ];
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

    it('エラーが発生した場合は例外を投げること', async () => {
      // Arrange
      const error = new Error('Database error');
      mockDb.findArticles.mockRejectedValue(error);

      // Act & Assert
      await expect(fetchArticlesByCategory('tech')).rejects.toThrow(
        'Database error'
      );
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

    it('エラーが発生した場合は例外を投げること', async () => {
      // Arrange
      const error = new Error('Database error');
      mockDb.getTotalArticleCount.mockRejectedValue(error);

      // Act & Assert
      await expect(fetchTotalArticleCount()).rejects.toThrow('Database error');
    });
  });

  describe('getArticle', () => {
    it('スラッグから記事を取得すること', async () => {
      // Arrange
      const mockArticle = createMockArticle({ slug: 'test-slug' });
      mockDb.findArticleBySlug.mockResolvedValue(mockArticle);

      // Act
      const result = await getArticle('test-slug');

      // Assert
      expect(mockDb.findArticleBySlug).toHaveBeenCalledWith('test-slug');
      expect(result).toEqual(mockArticle);
    });

    it('存在しない記事の場合はnullを返すこと', async () => {
      // Arrange
      mockDb.findArticleBySlug.mockResolvedValue(null);

      // Act
      const result = await getArticle('nonexistent-slug');

      // Assert
      expect(result).toBeNull();
    });

    it('エラーが発生した場合は例外を投げること', async () => {
      // Arrange
      const error = new Error('Database error');
      mockDb.findArticleBySlug.mockRejectedValue(error);

      // Act & Assert
      await expect(getArticle('test-slug')).rejects.toThrow('Database error');
    });
  });

  describe('fetchTrendingArticles', () => {
    it('指定された件数のトレンド記事を取得すること', async () => {
      // Arrange
      const mockArticles = [
        createMockArticle(),
        createMockArticle({ id: '2' }),
      ];
      mockDb.findTrendingArticles.mockResolvedValue(mockArticles);

      // Act
      const result = await fetchTrendingArticles(2);

      // Assert
      expect(mockDb.findTrendingArticles).toHaveBeenCalledWith(2);
      expect(result).toEqual(mockArticles);
    });

    it('デフォルト件数で動作すること', async () => {
      // Arrange
      const mockArticles = [createMockArticle()];
      mockDb.findTrendingArticles.mockResolvedValue(mockArticles);

      // Act
      const result = await fetchTrendingArticles();

      // Assert
      expect(mockDb.findTrendingArticles).toHaveBeenCalledWith(5);
      expect(result).toEqual(mockArticles);
    });
  });

  describe('fetchPopularArticles', () => {
    it('指定された件数の人気記事を取得すること', async () => {
      // Arrange
      const mockArticles = [createMockArticle({ featured: true })];
      mockDb.findArticles.mockResolvedValue(mockArticles);

      // Act
      const result = await fetchPopularArticles(1);

      // Assert
      expect(mockDb.findArticles).toHaveBeenCalledWith({
        featured: true,
        limit: 1,
        delay: 1500,
      });
      expect(result).toEqual(mockArticles);
    });

    it('デフォルト件数で動作すること', async () => {
      // Arrange
      const mockArticles = [createMockArticle({ featured: true })];
      mockDb.findArticles.mockResolvedValue(mockArticles);

      // Act
      const result = await fetchPopularArticles();

      // Assert
      expect(mockDb.findArticles).toHaveBeenCalledWith({
        featured: true,
        limit: 10,
        delay: 1500,
      });
      expect(result).toEqual(mockArticles);
    });
  });

  describe('fetchLatestArticles', () => {
    it('指定された件数の最新記事を取得すること', async () => {
      // Arrange
      const mockArticles = [createMockArticle()];
      mockDb.findArticles.mockResolvedValue(mockArticles);

      // Act
      const result = await fetchLatestArticles(1);

      // Assert
      expect(mockDb.findArticles).toHaveBeenCalledWith({ limit: 1 });
      expect(result).toEqual(mockArticles);
    });

    it('デフォルト件数で動作すること', async () => {
      // Arrange
      const mockArticles = [createMockArticle()];
      mockDb.findArticles.mockResolvedValue(mockArticles);

      // Act
      const result = await fetchLatestArticles();

      // Assert
      expect(mockDb.findArticles).toHaveBeenCalledWith({ limit: 10 });
      expect(result).toEqual(mockArticles);
    });
  });

  describe('fetchCategories', () => {
    it('カテゴリ一覧を取得すること', async () => {
      // Arrange
      const mockCategories = [createMockCategory()];
      mockDb.getCategories.mockResolvedValue(mockCategories);

      // Act
      const result = await fetchCategories();

      // Assert
      expect(mockDb.getCategories).toHaveBeenCalled();
      expect(result).toEqual(mockCategories);
    });

    it('エラーが発生した場合は例外を投げること', async () => {
      // Arrange
      const error = new Error('Database error');
      mockDb.getCategories.mockRejectedValue(error);

      // Act & Assert
      await expect(fetchCategories()).rejects.toThrow('Database error');
    });
  });

  describe('fetchCategoryStats', () => {
    it('カテゴリ統計を取得すること', async () => {
      // Arrange
      const mockStats = [{ category: createMockCategory(), count: 5 }];
      mockDb.getCategoryStats.mockResolvedValue(mockStats);

      // Act
      const result = await fetchCategoryStats();

      // Assert
      expect(mockDb.getCategoryStats).toHaveBeenCalled();
      expect(result).toEqual(mockStats);
    });

    it('エラーが発生した場合は例外を投げること', async () => {
      // Arrange
      const error = new Error('Database error');
      mockDb.getCategoryStats.mockRejectedValue(error);

      // Act & Assert
      await expect(fetchCategoryStats()).rejects.toThrow('Database error');
    });
  });

  describe('getRelatedArticles', () => {
    it('関連記事を取得すること', async () => {
      // Arrange
      const mockArticles = [createMockArticle()];
      mockDb.findRelatedArticles.mockResolvedValue(mockArticles);

      // Act
      const result = await getRelatedArticles('test-id', 3);

      // Assert
      expect(mockDb.findRelatedArticles).toHaveBeenCalledWith('test-id', 3);
      expect(result).toEqual(mockArticles);
    });

    it('デフォルト件数で動作すること', async () => {
      // Arrange
      const mockArticles = [createMockArticle()];
      mockDb.findRelatedArticles.mockResolvedValue(mockArticles);

      // Act
      const result = await getRelatedArticles('test-id');

      // Assert
      expect(mockDb.findRelatedArticles).toHaveBeenCalledWith('test-id', 4);
      expect(result).toEqual(mockArticles);
    });

    it('エラーが発生した場合は例外を投げること', async () => {
      // Arrange
      const error = new Error('Database error');
      mockDb.findRelatedArticles.mockRejectedValue(error);

      // Act & Assert
      await expect(getRelatedArticles('test-id')).rejects.toThrow(
        'Database error'
      );
    });
  });

  describe('getComments', () => {
    it('コメントを取得すること', async () => {
      // Arrange
      const mockComments = [createMockComment()];
      mockDb.findCommentsByArticle.mockResolvedValue(mockComments);

      // Act
      const result = await getComments('test-article', 1000);

      // Assert
      expect(mockDb.findCommentsByArticle).toHaveBeenCalledWith(
        'test-article',
        1000
      );
      expect(result).toEqual(mockComments);
    });

    it('デフォルト遅延で動作すること', async () => {
      // Arrange
      const mockComments = [createMockComment()];
      mockDb.findCommentsByArticle.mockResolvedValue(mockComments);

      // Act
      const result = await getComments('test-article');

      // Assert
      expect(mockDb.findCommentsByArticle).toHaveBeenCalledWith(
        'test-article',
        2000
      );
      expect(result).toEqual(mockComments);
    });

    it('空のコメント配列を返すこと', async () => {
      // Arrange
      mockDb.findCommentsByArticle.mockResolvedValue([]);

      // Act
      const result = await getComments('test-article');

      // Assert
      expect(result).toEqual([]);
    });

    it('エラーが発生した場合は例外を投げること', async () => {
      // Arrange
      const error = new Error('Database error');
      mockDb.findCommentsByArticle.mockRejectedValue(error);

      // Act & Assert
      await expect(getComments('test-article')).rejects.toThrow(
        'Database error'
      );
    });
  });
});
