import { describe, it, expect, beforeEach, vi } from 'vitest';
import { notFound } from 'next/navigation';
import type { Article } from '@/lib/types';

// Mock Next.js functions
vi.mock('next/navigation', () => ({
  notFound: vi.fn(),
}));

// Mock data fetcher
vi.mock('@/lib/data-fetchers', () => ({
  getArticle: vi.fn(),
}));

// Mock components to focus on page logic
vi.mock('./_components/ArticleContent', () => ({
  ArticleContent: ({
    content,
    excerpt,
  }: {
    content: string;
    excerpt: string;
  }) => (
    <div data-testid="article-content">
      <div data-testid="excerpt">{excerpt}</div>
      <div data-testid="content">{content}</div>
    </div>
  ),
}));

vi.mock('./_components/AuthorSection', () => ({
  AuthorSection: ({
    author,
    publishedAt,
  }: {
    author: { name: string };
    publishedAt: Date;
  }) => (
    <div data-testid="author-section">
      <span data-testid="author-name">{author.name}</span>
      <span data-testid="published-date">{publishedAt.toISOString()}</span>
    </div>
  ),
}));

vi.mock('./_components/CommentsSection', () => ({
  CommentsSection: ({ articleId }: { articleId: string }) => (
    <div data-testid="comments-section" data-article-id={articleId}>
      Comments for {articleId}
    </div>
  ),
}));

vi.mock('./_components/RelatedArticles', () => ({
  RelatedArticles: ({ articleId }: { articleId: string }) => (
    <div data-testid="related-articles" data-article-id={articleId}>
      Related articles for {articleId}
    </div>
  ),
}));

// Mock Suspense component
vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    Suspense: ({
      children,
      fallback,
    }: {
      children: React.ReactNode;
      fallback: React.ReactNode;
    }) => (
      <div data-testid="suspense">
        <div data-testid="suspense-fallback" style={{ display: 'none' }}>
          {fallback}
        </div>
        {children}
      </div>
    ),
  };
});

const mockGetArticle = vi.fn();

const mockArticle: Article = {
  id: 'test-article-id',
  slug: 'test-article-slug',
  title: 'Test Article Title',
  excerpt: 'This is a test article excerpt.',
  content: 'This is the test article content.',
  author: {
    id: 'author1',
    name: 'Test Author',
    avatar: 'https://example.com/avatar.jpg',
    bio: 'Test author bio',
    role: 'Senior Writer',
  },
  category: {
    id: 'cat1',
    name: 'Technology',
    slug: 'technology',
    description: 'Tech articles',
    color: 'bg-blue-100 text-blue-800',
  },
  tags: ['react', 'nextjs', 'testing'],
  publishedAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
  viewCount: 1500,
  likeCount: 75,
  commentCount: 12,
  readingTime: 5,
  featured: true,
};

// Import after mocking
const { getArticle } = await import('@/lib/data-fetchers');
vi.mocked(getArticle).mockImplementation(mockGetArticle);

describe('Article Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render article when found', async () => {
    mockGetArticle.mockResolvedValue(mockArticle);

    // Import the page component after mocking
    const { default: ArticlePage } = await import('./page');

    const params = Promise.resolve({ slug: 'test-article-slug' });
    const result = await ArticlePage({ params });

    expect(getArticle).toHaveBeenCalledWith('test-article-slug');
    expect(result).toBeDefined();
  });

  it('should call notFound when article is not found', async () => {
    mockGetArticle.mockResolvedValue(null);

    const { default: ArticlePage } = await import('./page');

    const params = Promise.resolve({ slug: 'nonexistent-slug' });

    try {
      await ArticlePage({ params });
    } catch {
      // notFound() throws an error in Next.js
    }

    expect(getArticle).toHaveBeenCalledWith('nonexistent-slug');
    expect(notFound).toHaveBeenCalled();
  });

  it('should generate correct metadata for existing article', async () => {
    mockGetArticle.mockResolvedValue(mockArticle);

    const { generateMetadata } = await import('./page');

    const params = Promise.resolve({ slug: 'test-article-slug' });
    const metadata = await generateMetadata({ params });

    expect(metadata).toEqual({
      title: 'Test Article Title',
      description: 'This is a test article excerpt.',
      authors: [{ name: 'Test Author' }],
      keywords: ['react', 'nextjs', 'testing'],
      openGraph: {
        title: 'Test Article Title',
        description: 'This is a test article excerpt.',
        type: 'article',
        publishedTime: mockArticle.publishedAt.toISOString(),
        authors: ['Test Author'],
        tags: ['react', 'nextjs', 'testing'],
      },
    });
  });

  it('should generate not found metadata for nonexistent article', async () => {
    mockGetArticle.mockResolvedValue(null);

    const { generateMetadata } = await import('./page');

    const params = Promise.resolve({ slug: 'nonexistent-slug' });
    const metadata = await generateMetadata({ params });

    expect(metadata).toEqual({
      title: 'Article Not Found',
    });
  });

  it('should handle slug parameter correctly', async () => {
    mockGetArticle.mockResolvedValue(mockArticle);

    const { default: ArticlePage } = await import('./page');

    const testSlug = 'complex-article-slug-123';
    const params = Promise.resolve({ slug: testSlug });

    await ArticlePage({ params });

    expect(getArticle).toHaveBeenCalledWith(testSlug);
  });
});
