import {
  fetchCategories,
  fetchCategoryStats,
  fetchCategoriesNoDedupe,
  fetchCategoryStatsNoDedupe,
} from '@/lib/data-fetchers';

// 同一Suspense境界内で複数回同じデータを取得するコンポーネント
async function MultipleCallsWithCache() {
  console.log('[DEMO] MultipleCallsWithCache component rendering');

  // 意図的に同じ関数を複数回呼び出す
  const [categories1, categories2, categories3] = await Promise.all([
    fetchCategories(), // React cache使用 - 1回目
    fetchCategories(), // React cache使用 - 2回目（重複排除されるべき）
    fetchCategories(), // React cache使用 - 3回目（重複排除されるべき）
  ]);

  const [stats1, stats2] = await Promise.all([
    fetchCategoryStats(), // React cache使用 - 1回目
    fetchCategoryStats(), // React cache使用 - 2回目（重複排除されるべき）
  ]);

  return (
    <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
      <h4 className="font-semibold mb-2 text-green-700">
        ✅ WITH Deduplication (React cache)
      </h4>
      <div className="text-sm space-y-1">
        <div>
          カテゴリ数: {categories1.length} / {categories2.length} /{' '}
          {categories3.length}
        </div>
        <div>
          統計数: {stats1.length} / {stats2.length}
        </div>
        <div className="text-green-600 font-medium">
          同じfetchCategories()を3回、fetchCategoryStats()を2回呼び出し
        </div>
      </div>
    </div>
  );
}

async function MultipleCallsNoDedupe() {
  console.log('[DEMO] MultipleCallsNoDedupe component rendering');

  // 意図的に同じ関数を複数回呼び出す（cache未使用）
  const [categories1, categories2, categories3] = await Promise.all([
    fetchCategoriesNoDedupe(), // cache未使用 - 1回目
    fetchCategoriesNoDedupe(), // cache未使用 - 2回目（重複リクエスト発生）
    fetchCategoriesNoDedupe(), // cache未使用 - 3回目（重複リクエスト発生）
  ]);

  const [stats1, stats2] = await Promise.all([
    fetchCategoryStatsNoDedupe(), // cache未使用 - 1回目
    fetchCategoryStatsNoDedupe(), // cache未使用 - 2回目（重複リクエスト発生）
  ]);

  return (
    <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
      <h4 className="font-semibold mb-2 text-red-700">
        ❌ WITHOUT Deduplication
      </h4>
      <div className="text-sm space-y-1">
        <div>
          カテゴリ数: {categories1.length} / {categories2.length} /{' '}
          {categories3.length}
        </div>
        <div>
          統計数: {stats1.length} / {stats2.length}
        </div>
        <div className="text-red-600 font-medium">
          同じfetchCategoriesNoDedupe()を3回、fetchCategoryStatsNoDedupe()を2回呼び出し
        </div>
      </div>
    </div>
  );
}

export async function DeduplicationDemo() {
  return (
    <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg mb-6">
      <h2 className="text-xl font-bold mb-4 text-blue-800">
        🔬 Deduplicating Requests デモ
      </h2>

      <div className="bg-white p-4 rounded-lg mb-4">
        <h3 className="font-semibold mb-2">確認方法:</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>開発者ツールのコンソールを開く</li>
          <li>
            ページをリロードして下記のログを確認:
            <ul className="list-disc list-inside ml-4 mt-1">
              <li>
                <code>[CACHE]</code>: React
                cache関数の呼び出し（1回のみ表示されるべき）
              </li>
              <li>
                <code>[NO DEDUPE]</code>:
                cache未使用関数の呼び出し（複数回表示される）
              </li>
              <li>
                <code>[DB REQUEST]</code>: 実際のDB呼び出し
              </li>
            </ul>
          </li>
          <li>右下の「DB Requests」ボタンでリクエストログを確認</li>
        </ol>
      </div>

      <div className="space-y-4">
        <MultipleCallsWithCache />
        <MultipleCallsNoDedupe />
      </div>

      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
        <p className="text-sm text-yellow-800">
          <strong>期待される結果:</strong>
          <br />
          • React cache版: [CACHE]ログが1回ずつ、[DB REQUEST]が1回ずつ
          <br />• cache未使用版: [NO DEDUPE]ログが3回と2回、[DB
          REQUEST]が3回と2回
        </p>
      </div>
    </div>
  );
}
