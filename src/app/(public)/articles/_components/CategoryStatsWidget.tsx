import { fetchCategories, fetchCategoryStats } from '@/lib/data-fetchers';

export async function CategoryStatsWidget() {
  // 同じデータを複数回取得して重複リクエストをテスト
  console.log(
    '[COMPONENT] CategoryStatsWidget - fetching categories and stats'
  );

  const [categories, categoryStats] = await Promise.all([
    fetchCategories(), // CategoryFilterSection でも呼び出される
    fetchCategoryStats(), // CategoryFilterSection でも呼び出される
  ]);

  const totalArticles = categoryStats.reduce(
    (sum, stat) => sum + stat.count,
    0
  );

  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-6">
      <h3 className="text-lg font-semibold mb-3">記事統計</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">
            {totalArticles}
          </div>
          <div className="text-sm text-gray-600">総記事数</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            {categories.length}
          </div>
          <div className="text-sm text-gray-600">カテゴリ数</div>
        </div>
        {categoryStats.slice(0, 2).map((stat) => (
          <div key={stat.category.id} className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {stat.count}
            </div>
            <div className="text-sm text-gray-600">{stat.category.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
