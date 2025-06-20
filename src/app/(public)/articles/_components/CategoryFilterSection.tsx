import { fetchCategories, fetchCategoryStats } from '@/lib/data-fetchers';
import { CategoryFilterClient } from './CategoryFilterClient';

interface CategoryFilterSectionProps {
  selectedCategory: string | null;
}

export async function CategoryFilterSection({
  selectedCategory,
}: CategoryFilterSectionProps) {
  const [categories, categoryStats] = await Promise.all([
    fetchCategories(),
    fetchCategoryStats(),
  ]);

  return (
    <CategoryFilterClient
      categories={categories}
      categoryStats={categoryStats}
      selectedCategory={selectedCategory}
    />
  );
}
