'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { CategoryFilter } from '@/components/features/CategoryFilter';
import type { Category } from '@/lib/types';

interface CategoryFilterClientProps {
  categories: Category[];
  categoryStats: Array<{ category: Category; count: number }>;
  selectedCategory: string | null;
}

export function CategoryFilterClient({
  categories,
  categoryStats,
  selectedCategory,
}: CategoryFilterClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleCategoryChange = (categorySlug: string | null) => {
    const params = new URLSearchParams(searchParams);

    if (categorySlug) {
      params.set('category', categorySlug);
    } else {
      params.delete('category');
    }

    // ページをリセット
    params.delete('page');

    const newUrl = `${pathname}?${params.toString()}`;
    router.push(newUrl);
  };

  return (
    <CategoryFilter
      categories={categories}
      selectedCategory={selectedCategory}
      categoryStats={categoryStats}
      onCategoryChange={handleCategoryChange}
    />
  );
}
