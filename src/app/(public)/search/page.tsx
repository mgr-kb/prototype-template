import { Suspense } from 'react';
import { db } from '@/lib/mock-db';
import { SearchForm } from './_components/SearchForm';
import { SearchResults } from './_components/SearchResults';
import type { Article } from '@/lib/types';

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q || '';
  const category = params.category || '';

  // カテゴリ一覧を取得
  const categories = await db.getCategories();

  // 検索実行（クエリが存在する場合のみ）
  let articles: Article[] = [];
  let total = 0;

  if (query.trim()) {
    try {
      const searchOptions: { category?: string } = {};
      if (category) {
        searchOptions.category = category;
      }

      articles = await db.searchArticles(query, searchOptions);
      total = articles.length;
    } catch (error) {
      console.error('Search error:', error);
      articles = [];
      total = 0;
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* ページヘッダー */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">記事検索</h1>
          <p className="text-gray-600">
            キーワードやカテゴリで記事を検索できます。
          </p>
        </div>

        {/* 検索フォーム */}
        <SearchForm
          categories={categories}
          initialQuery={query}
          initialCategory={category}
        />

        {/* 検索結果 */}
        <Suspense fallback={<SearchResultsSkeleton />}>
          <SearchResults
            articles={articles}
            query={query}
            category={category}
            total={total}
          />
        </Suspense>
      </div>
    </div>
  );
}

function SearchResultsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-8 bg-gray-200 rounded animate-pulse w-64"></div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg border border-gray-200 p-6"
          >
            <div className="h-4 bg-gray-200 rounded animate-pulse mb-3"></div>
            <div className="h-3 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
