import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CategoryFilter } from './index';
import type { Category } from '@/lib/types';

// Next.jsのnavigationをモック
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
  })),
  useSearchParams: vi.fn(() => ({
    get: vi.fn(),
  })),
  usePathname: vi.fn(() => '/articles'),
}));

const mockCategories: Category[] = [
  {
    id: '1',
    name: 'テクノロジー',
    slug: 'tech',
    description: 'テクノロジー関連の記事',
    color: 'bg-blue-100 text-blue-800',
  },
  {
    id: '2',
    name: 'デザイン',
    slug: 'design',
    description: 'デザイン関連の記事',
    color: 'bg-purple-100 text-purple-800',
  },
  {
    id: '3',
    name: 'ビジネス',
    slug: 'business',
    description: 'ビジネス関連の記事',
    color: 'bg-green-100 text-green-800',
  },
];

describe('CategoryFilter', () => {
  it('カテゴリ一覧が表示されること', () => {
    // Arrange & Act
    render(
      <CategoryFilter categories={mockCategories} selectedCategory={null} />
    );

    // Assert
    expect(screen.getByText('全て')).toBeInTheDocument();
    expect(screen.getByText('テクノロジー')).toBeInTheDocument();
    expect(screen.getByText('デザイン')).toBeInTheDocument();
    expect(screen.getByText('ビジネス')).toBeInTheDocument();
  });

  it('選択されたカテゴリがアクティブ状態で表示されること', () => {
    // Arrange & Act
    render(
      <CategoryFilter categories={mockCategories} selectedCategory="tech" />
    );

    // Assert
    const techButton = screen.getByText('テクノロジー');
    expect(techButton).toHaveClass('bg-blue-600', 'text-white');
  });

  it('選択されていない場合は"全て"がアクティブ状態で表示されること', () => {
    // Arrange & Act
    render(
      <CategoryFilter categories={mockCategories} selectedCategory={null} />
    );

    // Assert
    const allButton = screen.getByText('全て');
    expect(allButton).toHaveClass('bg-gray-900', 'text-white');
  });

  it('カテゴリクリック時にonCategoryChangeが呼ばれること', () => {
    // Arrange
    const mockOnCategoryChange = vi.fn();
    render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategory={null}
        onCategoryChange={mockOnCategoryChange}
      />
    );

    // Act
    fireEvent.click(screen.getByText('テクノロジー'));

    // Assert
    expect(mockOnCategoryChange).toHaveBeenCalledWith('tech');
  });

  it('"全て"クリック時にonCategoryChangeがnullで呼ばれること', () => {
    // Arrange
    const mockOnCategoryChange = vi.fn();
    render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategory="tech"
        onCategoryChange={mockOnCategoryChange}
      />
    );

    // Act
    fireEvent.click(screen.getByText('全て'));

    // Assert
    expect(mockOnCategoryChange).toHaveBeenCalledWith(null);
  });

  it('各カテゴリに記事数が表示されること', () => {
    // Arrange
    const mockCategoryStats = [
      { category: mockCategories[0], count: 15 },
      { category: mockCategories[1], count: 8 },
      { category: mockCategories[2], count: 12 },
    ];

    // Act
    render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategory={null}
        categoryStats={mockCategoryStats}
      />
    );

    // Assert
    expect(screen.getByText('テクノロジー (15)')).toBeInTheDocument();
    expect(screen.getByText('デザイン (8)')).toBeInTheDocument();
    expect(screen.getByText('ビジネス (12)')).toBeInTheDocument();
  });
});
