import type { Article } from '@/lib/types';
import { ArticleCard } from '@/components/ui/ArticleCard';

interface SearchResultsProps {
  articles: Article[];
  query: string;
  category?: string;
  total: number;
  isLoading?: boolean;
}

export function SearchResults({
  articles,
  query,
  category,
  total,
  isLoading = false,
}: SearchResultsProps) {
  // ローディング状態
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <p className="text-lg text-gray-600">検索中...</p>
        </div>
      </div>
    );
  }

  // クエリが空の場合
  if (!query.trim()) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">検索結果</h2>
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              検索キーワードを入力してください
            </h3>
            <p className="text-gray-600">
              記事を検索するためにキーワードを入力してください。
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 検索結果のヘッダー
  const getResultHeader = () => {
    if (category) {
      const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
      return `"${query}" (${categoryName}) の検索結果: ${total}件`;
    }
    return `"${query}" の検索結果: ${total}件`;
  };

  return (
    <div className="space-y-6">
      {/* 検索結果ヘッダー */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">検索結果</h2>
        <p className="text-gray-600">{getResultHeader()}</p>
      </div>

      {/* 検索結果 */}
      {articles.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              該当する記事が見つかりませんでした
            </h3>
            <p className="text-gray-600">
              キーワードを変更するか、カテゴリフィルターを調整してみてください。
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
