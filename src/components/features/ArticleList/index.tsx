import type { Article } from '@/lib/types';
import { ArticleCard } from '@/components/ui/ArticleCard';
import { ArticleCardSkeleton } from '@/components/ui/ArticleCardSkeleton';

interface ArticleListProps {
  articles: Article[];
  loading?: boolean;
  title?: string;
  skeletonCount?: number;
}

export function ArticleList({
  articles,
  loading = false,
  title = '記事一覧',
  skeletonCount = 12,
}: ArticleListProps) {
  if (loading) {
    return (
      <section>
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
        <p className="text-gray-600 mb-4">記事を読み込み中...</p>
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          data-testid="article-list-container"
        >
          {Array.from({ length: skeletonCount }).map((_, index) => (
            <ArticleCardSkeleton
              key={index}
              {...{ 'data-testid': 'article-skeleton' }}
            />
          ))}
        </div>
      </section>
    );
  }

  if (articles.length === 0) {
    return (
      <section>
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
        <div className="text-center py-12">
          <div className="mb-4">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            記事が見つかりませんでした
          </h3>
          <p className="text-gray-600">
            検索条件を変更して再度お試しください。
          </p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        data-testid="article-list-container"
      >
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
