import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ArticleList } from './index';
import type { Article } from '@/lib/types';

const mockArticles: Article[] = [
  {
    id: '1',
    slug: 'test-article-1',
    title: 'テスト記事1',
    excerpt: 'テスト記事1の概要',
    content: 'テスト記事1の内容',
    author: {
      id: 'author1',
      name: '著者1',
      avatar: '/avatar1.jpg',
      bio: '著者1のプロフィール',
      role: 'ライター',
    },
    category: {
      id: 'cat1',
      name: 'テクノロジー',
      slug: 'tech',
      description: 'テクノロジー関連',
      color: 'bg-blue-100 text-blue-800',
    },
    tags: ['React', 'TypeScript'],
    publishedAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    viewCount: 100,
    likeCount: 10,
    commentCount: 5,
    readingTime: 5,
    featured: false,
  },
  {
    id: '2',
    slug: 'test-article-2',
    title: 'テスト記事2',
    excerpt: 'テスト記事2の概要',
    content: 'テスト記事2の内容',
    author: {
      id: 'author2',
      name: '著者2',
      avatar: '/avatar2.jpg',
      bio: '著者2のプロフィール',
      role: 'エディター',
    },
    category: {
      id: 'cat2',
      name: 'デザイン',
      slug: 'design',
      description: 'デザイン関連',
      color: 'bg-purple-100 text-purple-800',
    },
    tags: ['Design', 'UI/UX'],
    publishedAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
    viewCount: 200,
    likeCount: 20,
    commentCount: 8,
    readingTime: 7,
    featured: true,
  },
];

describe('ArticleList', () => {
  it('記事一覧が表示されること', () => {
    // Arrange & Act
    render(<ArticleList articles={mockArticles} />);

    // Assert
    expect(screen.getByText('テスト記事1')).toBeInTheDocument();
    expect(screen.getByText('テスト記事2')).toBeInTheDocument();
    expect(screen.getByText('著者1')).toBeInTheDocument();
    expect(screen.getByText('著者2')).toBeInTheDocument();
  });

  it('記事が空の場合に空状態が表示されること', () => {
    // Arrange & Act
    render(<ArticleList articles={[]} />);

    // Assert
    expect(screen.getByText('記事が見つかりませんでした')).toBeInTheDocument();
    expect(
      screen.getByText('検索条件を変更して再度お試しください。')
    ).toBeInTheDocument();
  });

  it('ローディング中にローディング状態が表示されること', () => {
    // Arrange & Act
    render(<ArticleList articles={[]} loading={true} />);

    // Assert
    expect(screen.getByText('記事を読み込み中...')).toBeInTheDocument();
    // スケルトンローダーが表示されることを確認
    expect(screen.getAllByTestId('article-skeleton')).toHaveLength(12);
  });

  it('グリッドレイアウトでコンポーネントが配置されること', () => {
    // Arrange & Act
    render(<ArticleList articles={mockArticles} />);

    // Assert
    const container = screen.getByTestId('article-list-container');
    expect(container).toHaveClass(
      'grid',
      'grid-cols-1',
      'md:grid-cols-2',
      'lg:grid-cols-3',
      'gap-6'
    );
  });

  it('カスタムタイトルが表示されること', () => {
    // Arrange & Act
    render(<ArticleList articles={mockArticles} title="カスタムタイトル" />);

    // Assert
    expect(screen.getByText('カスタムタイトル')).toBeInTheDocument();
  });

  it('デフォルトタイトルが表示されること', () => {
    // Arrange & Act
    render(<ArticleList articles={mockArticles} />);

    // Assert
    expect(screen.getByText('記事一覧')).toBeInTheDocument();
  });

  it('記事数に応じてスケルトンローダーの数が調整されること', () => {
    // Arrange & Act
    render(<ArticleList articles={[]} loading={true} skeletonCount={6} />);

    // Assert
    expect(screen.getAllByTestId('article-skeleton')).toHaveLength(6);
  });
});
