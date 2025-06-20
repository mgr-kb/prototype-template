'use client';

import type { Category } from '@/lib/types';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryChange?: (categorySlug: string | null) => void;
  categoryStats?: Array<{ category: Category; count: number }>;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  categoryStats,
}: CategoryFilterProps) {
  const handleCategoryClick = (categorySlug: string | null) => {
    onCategoryChange?.(categorySlug);
  };

  const getCategoryCount = (categoryId: string) => {
    return categoryStats?.find((stat) => stat.category.id === categoryId)
      ?.count;
  };

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {/* 全てボタン */}
      <button
        onClick={() => handleCategoryClick(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          selectedCategory === null
            ? 'bg-gray-900 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        全て
      </button>

      {/* カテゴリボタン */}
      {categories.map((category) => {
        const count = getCategoryCount(category.id);
        const isSelected = selectedCategory === category.slug;

        let buttonClasses =
          'px-4 py-2 rounded-full text-sm font-medium transition-colors ';

        if (isSelected) {
          // 選択時は背景を濃い色に
          if (category.color.includes('blue')) {
            buttonClasses += 'bg-blue-600 text-white';
          } else if (category.color.includes('purple')) {
            buttonClasses += 'bg-purple-600 text-white';
          } else if (category.color.includes('green')) {
            buttonClasses += 'bg-green-600 text-white';
          } else {
            buttonClasses += 'bg-gray-600 text-white';
          }
        } else {
          // 非選択時は薄い色
          buttonClasses += `${category.color} hover:opacity-80`;
        }

        return (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.slug)}
            className={buttonClasses}
          >
            {category.name}
            {count !== undefined ? ` (${count})` : ''}
          </button>
        );
      })}
    </div>
  );
}
