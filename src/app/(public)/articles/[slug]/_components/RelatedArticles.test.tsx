import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { RelatedArticles } from './RelatedArticles';
import type { Article } from '@/lib/types';

// Mock the data fetcher
vi.mock('@/lib/data-fetchers', () => ({
  getRelatedArticles: vi.fn(),
}));

// Mock Next.js Link component
vi.mock('next/link', () => {
  return {
    default: ({
      children,
      href,
      ...props
    }: {
      children: React.ReactNode;
      href: string;
      [key: string]: unknown;
    }) => (
      <a href={href} {...props}>
        {children}
      </a>
    ),
  };
});

const { getRelatedArticles } = await import('@/lib/data-fetchers');
const mockGetRelatedArticles = vi.mocked(getRelatedArticles);

const mockRelatedArticles: Article[] = [
  {
    id: '1',
    slug: 'related-article-1',
    title: 'Related Article 1',
    excerpt: 'This is the excerpt for related article 1.',
    content: 'Content of related article 1',
    author: {
      id: 'author1',
      name: 'John Author',
      avatar: 'https://example.com/john.jpg',
      bio: 'Author bio',
      role: 'Writer',
    },
    category: {
      id: 'cat1',
      name: 'Technology',
      slug: 'technology',
      description: 'Tech articles',
      color: 'bg-blue-100 text-blue-800',
    },
    tags: ['react', 'nextjs', 'javascript'],
    publishedAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    viewCount: 1000,
    likeCount: 50,
    commentCount: 10,
    readingTime: 5,
    featured: false,
  },
  {
    id: '2',
    slug: 'related-article-2',
    title: 'Related Article 2',
    excerpt: 'This is the excerpt for related article 2.',
    content: 'Content of related article 2',
    author: {
      id: 'author2',
      name: 'Jane Author',
      avatar: 'https://example.com/jane.jpg',
      bio: 'Author bio',
      role: 'Senior Writer',
    },
    category: {
      id: 'cat2',
      name: 'Design',
      slug: 'design',
      description: 'Design articles',
      color: 'bg-purple-100 text-purple-800',
    },
    tags: ['design', 'ui', 'ux', 'figma', 'prototyping'],
    publishedAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
    viewCount: 2000,
    likeCount: 80,
    commentCount: 15,
    readingTime: 8,
    featured: true,
  },
];

describe('RelatedArticles', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render related articles when data is available', async () => {
    mockGetRelatedArticles.mockResolvedValue(mockRelatedArticles);

    render(await RelatedArticles({ articleId: 'test-article' }));

    await waitFor(() => {
      expect(screen.getByText('Related Article 1')).toBeInTheDocument();
    });

    expect(screen.getByText('Related Article 2')).toBeInTheDocument();
    expect(
      screen.getByText('This is the excerpt for related article 1.')
    ).toBeInTheDocument();
    expect(
      screen.getByText('This is the excerpt for related article 2.')
    ).toBeInTheDocument();
  });

  it('should display article metadata correctly', async () => {
    mockGetRelatedArticles.mockResolvedValue(mockRelatedArticles);

    render(await RelatedArticles({ articleId: 'test-article' }));

    await waitFor(() => {
      expect(screen.getByText('Technology')).toBeInTheDocument();
    });

    expect(screen.getByText('Design')).toBeInTheDocument();
    expect(screen.getByText('John Author')).toBeInTheDocument();
    expect(screen.getByText('Jane Author')).toBeInTheDocument();
    expect(screen.getByText('1,000 views')).toBeInTheDocument();
    expect(screen.getByText('2,000 views')).toBeInTheDocument();
    expect(screen.getByText('5 min')).toBeInTheDocument();
    expect(screen.getByText('8 min')).toBeInTheDocument();
  });

  it('should render links to article pages', async () => {
    mockGetRelatedArticles.mockResolvedValue(mockRelatedArticles);

    render(await RelatedArticles({ articleId: 'test-article' }));

    await waitFor(() => {
      const link1 = screen.getByRole('link', { name: /Related Article 1/i });
      expect(link1).toHaveAttribute('href', '/articles/related-article-1');
    });

    const link2 = screen.getByRole('link', { name: /Related Article 2/i });
    expect(link2).toHaveAttribute('href', '/articles/related-article-2');
  });

  it('should display tags correctly with truncation', async () => {
    mockGetRelatedArticles.mockResolvedValue(mockRelatedArticles);

    render(await RelatedArticles({ articleId: 'test-article' }));

    await waitFor(() => {
      // First article has 3 tags - all should be shown
      expect(screen.getByText('#react')).toBeInTheDocument();
      expect(screen.getByText('#nextjs')).toBeInTheDocument();
      expect(screen.getByText('#javascript')).toBeInTheDocument();
    });

    // Second article has 5 tags - only first 3 should be shown with "+2 more"
    expect(screen.getByText('#design')).toBeInTheDocument();
    expect(screen.getByText('#ui')).toBeInTheDocument();
    expect(screen.getByText('#ux')).toBeInTheDocument();
    expect(screen.getByText('+2 more')).toBeInTheDocument();
  });

  it('should render empty state when no related articles', async () => {
    mockGetRelatedArticles.mockResolvedValue([]);

    render(await RelatedArticles({ articleId: 'test-article' }));

    await waitFor(() => {
      expect(
        screen.getByText('No related articles found.')
      ).toBeInTheDocument();
    });
  });

  it('should call getRelatedArticles with correct parameters', async () => {
    mockGetRelatedArticles.mockResolvedValue([]);
    const articleId = 'test-article-123';

    render(await RelatedArticles({ articleId }));

    expect(mockGetRelatedArticles).toHaveBeenCalledWith(articleId, 4);
  });

  it('should render category colors correctly', async () => {
    mockGetRelatedArticles.mockResolvedValue(mockRelatedArticles);

    render(await RelatedArticles({ articleId: 'test-article' }));

    await waitFor(() => {
      const techCategory = screen.getByText('Technology');
      expect(techCategory).toHaveClass('bg-blue-100', 'text-blue-800');
    });

    const designCategory = screen.getByText('Design');
    expect(designCategory).toHaveClass('bg-purple-100', 'text-purple-800');
  });

  it('should display author avatars with correct attributes', async () => {
    mockGetRelatedArticles.mockResolvedValue(mockRelatedArticles);

    render(await RelatedArticles({ articleId: 'test-article' }));

    await waitFor(() => {
      const johnAvatar = screen.getByAltText('John Author');
      expect(johnAvatar).toHaveAttribute('src', 'https://example.com/john.jpg');
    });

    const janeAvatar = screen.getByAltText('Jane Author');
    expect(janeAvatar).toHaveAttribute('src', 'https://example.com/jane.jpg');
  });

  it('should use grid layout for articles', async () => {
    mockGetRelatedArticles.mockResolvedValue(mockRelatedArticles);

    render(await RelatedArticles({ articleId: 'test-article' }));

    await waitFor(() => {
      const gridContainer = screen
        .getByText('Related Article 1')
        .closest('.grid');
      expect(gridContainer).toHaveClass('grid', 'md:grid-cols-2', 'gap-6');
    });
  });
});
