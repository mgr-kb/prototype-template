import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import SearchPage from './page';

// Mock the database
vi.mock('@/lib/mock-db', () => ({
  db: {
    searchArticles: vi.fn(),
    getCategories: vi.fn(),
  },
}));

// Mock the components
vi.mock('./_components/SearchForm', () => ({
  SearchForm: ({
    categories,
    initialQuery,
    initialCategory,
  }: {
    categories?: unknown[];
    initialQuery?: string;
    initialCategory?: string;
  }) => (
    <div data-testid="search-form">
      <p>SearchForm</p>
      <p>Query: {initialQuery}</p>
      <p>Category: {initialCategory}</p>
      <p>Categories: {categories?.length || 0}</p>
    </div>
  ),
}));

vi.mock('./_components/SearchResults', () => ({
  SearchResults: ({
    articles,
    query,
    category,
    total,
  }: {
    articles?: unknown[];
    query?: string;
    category?: string;
    total?: number;
  }) => (
    <div data-testid="search-results">
      <p>SearchResults</p>
      <p>Query: {query}</p>
      <p>Category: {category}</p>
      <p>Total: {total}</p>
      <p>Articles: {articles?.length || 0}</p>
    </div>
  ),
}));

import { db } from '@/lib/mock-db';

const mockDb = vi.mocked(db);

describe('Search Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockDb.getCategories.mockResolvedValue([
      {
        id: '1',
        name: 'Frontend',
        slug: 'frontend',
        description: 'Frontend topics',
        color: 'bg-blue-100 text-blue-800',
      },
      {
        id: '2',
        name: 'Backend',
        slug: 'backend',
        description: 'Backend topics',
        color: 'bg-green-100 text-green-800',
      },
    ]);

    mockDb.searchArticles.mockResolvedValue([
      {
        id: '1',
        slug: 'test-article',
        title: 'Test Article',
        excerpt: 'Test excerpt',
        content: 'Test content',
        author: {
          id: '1',
          name: 'Test Author',
          avatar: '/avatar.jpg',
          bio: 'Test bio',
          role: 'Author',
        },
        category: {
          id: '1',
          name: 'Frontend',
          slug: 'frontend',
          description: 'Frontend topics',
          color: 'bg-blue-100 text-blue-800',
        },
        tags: ['test'],
        publishedAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        viewCount: 100,
        likeCount: 10,
        commentCount: 5,
        readingTime: 3,
        featured: false,
      },
    ]);
  });

  it('should render search form and empty results when no search params', async () => {
    const component = await SearchPage({
      searchParams: Promise.resolve({}),
    });

    render(component);

    expect(screen.getByTestId('search-form')).toBeInTheDocument();
    expect(screen.getByTestId('search-results')).toBeInTheDocument();
    expect(screen.getAllByText(/Query:/)).toHaveLength(2); // One from form, one from results
    expect(screen.getByText('Categories: 2')).toBeInTheDocument();
    expect(mockDb.getCategories).toHaveBeenCalledTimes(1);
    expect(mockDb.searchArticles).not.toHaveBeenCalled();
  });

  it('should perform search when query is provided', async () => {
    const component = await SearchPage({
      searchParams: Promise.resolve({ q: 'React' }),
    });

    render(component);

    expect(mockDb.getCategories).toHaveBeenCalledTimes(1);
    expect(mockDb.searchArticles).toHaveBeenCalledWith('React', {});
    expect(mockDb.searchArticles).toHaveBeenCalledTimes(1);
    expect(screen.getAllByText('Query: React')).toHaveLength(2);
    expect(screen.getByText('Articles: 1')).toBeInTheDocument();
  });

  it('should include category filter when category is provided', async () => {
    const component = await SearchPage({
      searchParams: Promise.resolve({ q: 'React', category: 'frontend' }),
    });

    render(component);

    expect(mockDb.getCategories).toHaveBeenCalledTimes(1);
    expect(mockDb.searchArticles).toHaveBeenCalledWith('React', {
      category: 'frontend',
    });
    expect(mockDb.searchArticles).toHaveBeenCalledTimes(1);
    expect(screen.getAllByText('Query: React')).toHaveLength(2);
    expect(screen.getAllByText('Category: frontend')).toHaveLength(2);
  });

  it('should handle empty query gracefully', async () => {
    const component = await SearchPage({
      searchParams: Promise.resolve({ q: '' }),
    });

    render(component);

    expect(mockDb.getCategories).toHaveBeenCalledTimes(1);
    expect(mockDb.searchArticles).not.toHaveBeenCalled();
    expect(screen.getAllByText(/Query:/)).toHaveLength(2);
    expect(screen.getByText('Articles: 0')).toBeInTheDocument();
  });

  it('should set initial form values from search params', async () => {
    const component = await SearchPage({
      searchParams: Promise.resolve({ q: 'TypeScript', category: 'backend' }),
    });

    render(component);

    expect(mockDb.getCategories).toHaveBeenCalledTimes(1);
    expect(mockDb.searchArticles).toHaveBeenCalledWith('TypeScript', {
      category: 'backend',
    });
    expect(screen.getAllByText('Query: TypeScript')).toHaveLength(2);
    expect(screen.getAllByText('Category: backend')).toHaveLength(2);
  });

  it('should handle search error gracefully', async () => {
    mockDb.searchArticles.mockRejectedValueOnce(new Error('Database error'));

    const component = await SearchPage({
      searchParams: Promise.resolve({ q: 'test' }),
    });

    render(component);

    expect(mockDb.searchArticles).toHaveBeenCalledWith('test', {});
    expect(screen.getByText('Articles: 0')).toBeInTheDocument();
  });

  it('should handle whitespace-only query', async () => {
    const component = await SearchPage({
      searchParams: Promise.resolve({ q: '   ' }),
    });

    render(component);

    expect(mockDb.searchArticles).not.toHaveBeenCalled();
    expect(screen.getByText('Articles: 0')).toBeInTheDocument();
  });
});
