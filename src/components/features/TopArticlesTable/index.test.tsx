import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TopArticlesTable } from './index';
import type { Article } from '@/lib/types';

const mockArticles: Array<Article & { views: number }> = [
  {
    id: '1',
    slug: 'test-article-1',
    title: 'Test Article 1',
    excerpt: 'This is a test article excerpt',
    content: 'Full content',
    author: {
      id: 'author1',
      name: 'John Doe',
      avatar: '/avatar1.jpg',
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
    tags: ['react', 'javascript'],
    publishedAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    viewCount: 1500,
    likeCount: 25,
    commentCount: 5,
    readingTime: 8,
    featured: true,
    views: 1500,
  },
  {
    id: '2',
    slug: 'test-article-2',
    title: 'Test Article 2',
    excerpt: 'Another test article',
    content: 'Full content 2',
    author: {
      id: 'author2',
      name: 'Jane Smith',
      avatar: '/avatar2.jpg',
      bio: 'Another author bio',
      role: 'Writer',
    },
    category: {
      id: 'cat2',
      name: 'Design',
      slug: 'design',
      description: 'Design articles',
      color: 'bg-green-100 text-green-800',
    },
    tags: ['design', 'ui'],
    publishedAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
    viewCount: 1200,
    likeCount: 18,
    commentCount: 3,
    readingTime: 6,
    featured: false,
    views: 1200,
  },
];

describe('TopArticlesTable', () => {
  it('記事テーブルが正しく表示されること', () => {
    render(<TopArticlesTable articles={mockArticles} />);

    expect(screen.getByText('Rank')).toBeInTheDocument();
    expect(screen.getByText('Article')).toBeInTheDocument();
    expect(screen.getByText('Author')).toBeInTheDocument();
    expect(screen.getByText('Views')).toBeInTheDocument();
    expect(screen.getByText('Published')).toBeInTheDocument();
  });

  it('記事データが正しく表示されること', () => {
    render(<TopArticlesTable articles={mockArticles} />);

    expect(screen.getByText('Test Article 1')).toBeInTheDocument();
    expect(screen.getByText('Test Article 2')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('1,500')).toBeInTheDocument();
    expect(screen.getByText('1,200')).toBeInTheDocument();
  });

  it('ランキングが正しく表示されること', () => {
    render(<TopArticlesTable articles={mockArticles} />);

    const ranks = screen.getAllByText(/^[0-9]+$/);
    expect(ranks[0]).toHaveTextContent('1');
    expect(ranks[1]).toHaveTextContent('2');
  });

  it('カテゴリバッジが正しく表示されること', () => {
    render(<TopArticlesTable articles={mockArticles} />);

    expect(screen.getByText('Technology')).toBeInTheDocument();
    expect(screen.getByText('Design')).toBeInTheDocument();
  });

  it('日付が正しくフォーマットされること', () => {
    render(<TopArticlesTable articles={mockArticles} />);

    expect(screen.getByText('2024/1/15')).toBeInTheDocument();
    expect(screen.getByText('2024/1/10')).toBeInTheDocument();
  });

  it('空の記事リストでも正しく表示されること', () => {
    render(<TopArticlesTable articles={[]} />);

    expect(screen.getByText('No articles found')).toBeInTheDocument();
  });

  it('記事タイトルがリンクになっていること', () => {
    render(<TopArticlesTable articles={mockArticles} />);

    const link1 = screen.getByRole('link', { name: 'Test Article 1' });
    const link2 = screen.getByRole('link', { name: 'Test Article 2' });

    expect(link1).toHaveAttribute('href', '/articles/test-article-1');
    expect(link2).toHaveAttribute('href', '/articles/test-article-2');
  });
});
