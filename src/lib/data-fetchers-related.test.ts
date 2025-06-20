import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getComments, getRelatedArticles } from './data-fetchers';
import { db } from './mock-db';
import type { Article, Comment } from './types';

// Mock Next.js cache functions
vi.mock('next/cache', () => ({
  unstable_cache: vi.fn((fn) => fn),
  unstable_cacheLife: vi.fn(),
}));

vi.mock('react', () => ({
  cache: vi.fn((fn) => fn),
}));

// Mock the database
vi.mock('./mock-db', () => ({
  db: {
    findRelatedArticles: vi.fn(),
    findCommentsByArticle: vi.fn(),
  },
}));

const mockDb = vi.mocked(db);

describe('Data Fetchers for Article Detail', () => {
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

  const createMockComment = (overrides: Partial<Comment> = {}): Comment => ({
    id: '1',
    articleId: 'test-article',
    author: 'Test User',
    content: 'Test comment',
    createdAt: new Date('2024-01-01'),
    likes: 5,
    ...overrides,
  });

  describe('getRelatedArticles', () => {
    it('関連記事を正しいパラメータで取得すること', async () => {
      // Arrange
      const mockArticles = [
        createMockArticle({ id: '2', title: 'Related Article' }),
      ];
      mockDb.findRelatedArticles.mockResolvedValue(mockArticles);

      // Act
      const result = await getRelatedArticles('test-id', 4);

      // Assert
      expect(mockDb.findRelatedArticles).toHaveBeenCalledWith('test-id', 4);
      expect(result).toEqual(mockArticles);
    });

    it('デフォルト件数で関連記事を取得すること', async () => {
      // Arrange
      const mockArticles = [createMockArticle()];
      mockDb.findRelatedArticles.mockResolvedValue(mockArticles);

      // Act
      const result = await getRelatedArticles('test-id');

      // Assert
      expect(mockDb.findRelatedArticles).toHaveBeenCalledWith('test-id', 4);
      expect(result).toEqual(mockArticles);
    });

    it('関連記事が見つからない場合は空配列を返すこと', async () => {
      // Arrange
      mockDb.findRelatedArticles.mockResolvedValue([]);

      // Act
      const result = await getRelatedArticles('nonexistent-id', 4);

      // Assert
      expect(result).toEqual([]);
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
    it('指定した遅延でコメントを取得すること', async () => {
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

    it('デフォルト遅延でコメントを取得すること', async () => {
      // Arrange
      const mockComments: Comment[] = [];
      mockDb.findCommentsByArticle.mockResolvedValue(mockComments);

      // Act
      await getComments('test-article');

      // Assert
      expect(mockDb.findCommentsByArticle).toHaveBeenCalledWith(
        'test-article',
        2000
      );
    });

    it('コメントが見つからない場合は空配列を返すこと', async () => {
      // Arrange
      mockDb.findCommentsByArticle.mockResolvedValue([]);

      // Act
      const result = await getComments('nonexistent-article');

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

    it('ストリーミング対応の遅延パラメータが正しく渡されること', async () => {
      // Arrange
      const mockComments = [
        createMockComment({ id: '1' }),
        createMockComment({ id: '2' }),
      ];
      mockDb.findCommentsByArticle.mockResolvedValue(mockComments);

      // Act
      const result = await getComments('test-article', 500);

      // Assert
      expect(mockDb.findCommentsByArticle).toHaveBeenCalledWith(
        'test-article',
        500
      );
      expect(result).toHaveLength(2);
      expect(result).toEqual(mockComments);
    });
  });
});
