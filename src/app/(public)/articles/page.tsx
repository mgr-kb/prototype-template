import { Suspense } from 'react';
import { ArticleList } from '@/components/features/ArticleList';
import { CategoryFilterSection } from './_components/CategoryFilterSection';
import { ArticleListSection } from './_components/ArticleListSection';
import { DeduplicationDemo } from './_components/DeduplicationDemo';

interface ArticlesPageProps {
  searchParams: Promise<{
    category?: string;
    page?: string;
  }>;
}

export default async function ArticlesPage({
  searchParams,
}: ArticlesPageProps) {
  const resolvedSearchParams = await searchParams;
  const selectedCategory = resolvedSearchParams.category || null;
  const currentPage = parseInt(resolvedSearchParams.page || '1', 10);
  const articlesPerPage = 12;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">記事一覧</h1>

      {/* Deduplicating Requests デモ */}
      <Suspense
        fallback={
          <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg mb-6 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-64 mb-4"></div>
            <div className="grid md:grid-cols-2 gap-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="bg-white p-4 rounded-lg">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-20 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        }
      >
        <DeduplicationDemo />
      </Suspense>

      {/* カテゴリフィルター - 並列データフェッチでSuspense */}
      <Suspense
        fallback={
          <div className="flex flex-wrap gap-2 mb-6">
            <div className="px-4 py-2 rounded-full bg-gray-200 animate-pulse w-16 h-8"></div>
            <div className="px-4 py-2 rounded-full bg-gray-200 animate-pulse w-20 h-8"></div>
            <div className="px-4 py-2 rounded-full bg-gray-200 animate-pulse w-18 h-8"></div>
          </div>
        }
      >
        <CategoryFilterSection selectedCategory={selectedCategory} />
      </Suspense>

      {/* 記事一覧 - 並列データフェッチでSuspense */}
      <Suspense
        fallback={<ArticleList articles={[]} loading={true} title="記事一覧" />}
      >
        <ArticleListSection
          selectedCategory={selectedCategory}
          currentPage={currentPage}
          articlesPerPage={articlesPerPage}
        />
      </Suspense>
    </div>
  );
}
