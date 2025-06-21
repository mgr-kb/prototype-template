import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SearchResults } from './index';
import type { Article } from '@/lib/types';

// Mock ArticleCard component
vi.mock('@/components/ui/ArticleCard', () => ({
  ArticleCard: ({ article }: { article: Article }) => (
    <div data-testid={`article-card-${article.id}`}>
      <h3>{article.title}</h3>
      <p>{article.excerpt}</p>
    </div>
  ),
}));

const mockArticles: Article[] = [
  {
    id: '1',
    slug: 'test-article-1',
    title: 'Test Article 1',
    excerpt: 'This is a test article about React',
    content: 'Lorem ipsum dolor sit amet',
    author: {
      id: '1',
      name: 'John Doe',
      avatar: '/avatar1.jpg',
      bio: 'Frontend Developer',
      role: 'Developer',
    },
    category: {
      id: '1',
      name: 'Frontend',
      slug: 'frontend',
      description: 'Frontend topics',
      color: 'bg-blue-100 text-blue-800',
    },
    tags: ['react', 'javascript'],
    publishedAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    viewCount: 100,
    likeCount: 10,
    commentCount: 5,
    readingTime: 3,
    featured: false,
  },
  {
    id: '2',
    slug: 'test-article-2',
    title: 'Test Article 2',
    excerpt: 'This is another test article about Vue',
    content: 'Lorem ipsum dolor sit amet',
    author: {
      id: '2',
      name: 'Jane Smith',
      avatar: '/avatar2.jpg',
      bio: 'Full Stack Developer',
      role: 'Developer',
    },
    category: {
      id: '1',
      name: 'Frontend',
      slug: 'frontend',
      description: 'Frontend topics',
      color: 'bg-blue-100 text-blue-800',
    },
    tags: ['vue', 'javascript'],
    publishedAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
    viewCount: 200,
    likeCount: 20,
    commentCount: 10,
    readingTime: 5,
    featured: true,
  },
];

describe('SearchResults', () => {
  it('should render search results with articles', () => {
    render(<SearchResults articles={mockArticles} query="React" total={2} />);

    expect(screen.getByText('検索結果')).toBeInTheDocument();
    expect(screen.getByText('"React" の検索結果: 2件')).toBeInTheDocument();
    expect(screen.getByTestId('article-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('article-card-2')).toBeInTheDocument();
    expect(screen.getByText('Test Article 1')).toBeInTheDocument();
    expect(screen.getByText('Test Article 2')).toBeInTheDocument();
  });

  it('should show no results message when no articles found', () => {
    render(<SearchResults articles={[]} query="nonexistent" total={0} />);

    expect(screen.getByText('検索結果')).toBeInTheDocument();
    expect(
      screen.getByText('"nonexistent" の検索結果: 0件')
    ).toBeInTheDocument();
    expect(
      screen.getByText('該当する記事が見つかりませんでした')
    ).toBeInTheDocument();
    expect(screen.getByText(/キーワードを変更/)).toBeInTheDocument();
  });

  it('should show category filter in results when provided', () => {
    render(
      <SearchResults
        articles={mockArticles}
        query="React"
        category="frontend"
        total={2}
      />
    );

    expect(
      screen.getByText('"React" (Frontend) の検索結果: 2件')
    ).toBeInTheDocument();
  });

  it('should handle category name capitalization correctly', () => {
    render(
      <SearchResults
        articles={mockArticles}
        query="test"
        category="backend"
        total={1}
      />
    );

    expect(
      screen.getByText('"test" (Backend) の検索結果: 1件')
    ).toBeInTheDocument();
  });

  it('should render empty state when no query provided', () => {
    render(<SearchResults articles={[]} query="" total={0} />);

    expect(
      screen.getByText('検索キーワードを入力してください')
    ).toBeInTheDocument();
    expect(screen.getByText(/記事を検索/)).toBeInTheDocument();
  });

  it('should display correct article count', () => {
    render(
      <SearchResults
        articles={mockArticles.slice(0, 1)}
        query="React"
        total={10}
      />
    );

    expect(screen.getByText('"React" の検索結果: 10件')).toBeInTheDocument();
  });

  it('should show loading state when isLoading is true', () => {
    render(
      <SearchResults articles={[]} query="React" total={0} isLoading={true} />
    );

    expect(screen.getByText('検索中...')).toBeInTheDocument();
    expect(screen.queryByText('検索結果')).not.toBeInTheDocument();
  });

  it('should handle whitespace-only query as empty', () => {
    render(<SearchResults articles={[]} query="   " total={0} />);

    expect(
      screen.getByText('検索キーワードを入力してください')
    ).toBeInTheDocument();
  });

  it('should render correct grid layout for articles', () => {
    render(<SearchResults articles={mockArticles} query="test" total={2} />);

    const gridContainer = screen.getByTestId('article-card-1').parentElement;
    expect(gridContainer).toHaveClass(
      'grid',
      'gap-6',
      'md:grid-cols-2',
      'lg:grid-cols-3'
    );
  });
});
