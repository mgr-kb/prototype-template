import {
  fetchArticlesWithPagination,
  fetchArticlesByCategory,
  fetchTotalArticleCount,
} from '@/lib/data-fetchers';
import { ArticleList } from '@/components/features/ArticleList';
import { PaginationClient } from './PaginationClient';

interface ArticleListSectionProps {
  selectedCategory: string | null;
  currentPage: number;
  articlesPerPage: number;
}

export async function ArticleListSection({
  selectedCategory,
  currentPage,
  articlesPerPage,
}: ArticleListSectionProps) {
  const [articles, totalCount] = await Promise.all([
    selectedCategory
      ? fetchArticlesByCategory(selectedCategory, {
          page: currentPage,
          limit: articlesPerPage,
        })
      : fetchArticlesWithPagination({
          page: currentPage,
          limit: articlesPerPage,
        }),
    fetchTotalArticleCount(selectedCategory || undefined),
  ]);

  const totalPages = Math.ceil(totalCount / articlesPerPage);
  const title = selectedCategory
    ? `カテゴリ: ${selectedCategory} の記事一覧`
    : '記事一覧';

  return (
    <>
      <ArticleList articles={articles} title={title} />

      {totalPages > 1 && (
        <PaginationClient currentPage={currentPage} totalPages={totalPages} />
      )}
    </>
  );
}
