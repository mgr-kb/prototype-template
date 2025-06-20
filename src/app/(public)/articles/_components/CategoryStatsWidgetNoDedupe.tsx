import {
  fetchCategoriesNoDedupe,
  fetchCategoryStatsNoDedupe,
} from '@/lib/data-fetchers';

export async function CategoryStatsWidgetNoDedupe() {
  // React cache を使わない版でリクエストの重複を確認
  console.log(
    '[COMPONENT] CategoryStatsWidgetNoDedupe - fetching categories and stats WITHOUT deduplication'
  );

  const [categories, categoryStats] = await Promise.all([
    fetchCategoriesNoDedupe(), // 重複リクエストが発生する
    fetchCategoryStatsNoDedupe(), // 重複リクエストが発生する
  ]);

  const totalArticles = categoryStats.reduce(
    (sum, stat) => sum + stat.count,
    0
  );

  return (
    <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-6">
      <h3 className="text-lg font-semibold mb-3 text-red-800">
        記事統計 (NO DEDUPLICATION)
      </h3>
      <div className="text-sm text-red-600 mb-3">
        このコンポーネントはReact cacheを使用せず、重複リクエストが発生します
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">{totalArticles}</div>
          <div className="text-sm text-gray-600">総記事数</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">
            {categories.length}
          </div>
          <div className="text-sm text-gray-600">カテゴリ数</div>
        </div>
        {categoryStats.slice(0, 2).map((stat) => (
          <div key={stat.category.id} className="text-center">
            <div className="text-2xl font-bold text-red-600">{stat.count}</div>
            <div className="text-sm text-gray-600">{stat.category.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
