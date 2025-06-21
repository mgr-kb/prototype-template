export default function SearchLoading() {
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

        {/* 検索フォームのスケルトン */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="space-y-4">
            {/* 検索キーワードフィールド */}
            <div>
              <div className="h-5 bg-gray-200 rounded animate-pulse mb-2 w-24"></div>
              <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* カテゴリフィールド */}
            <div>
              <div className="h-5 bg-gray-200 rounded animate-pulse mb-2 w-16"></div>
              <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* 検索ボタン */}
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* 検索結果のスケルトン */}
        <div className="space-y-6">
          {/* 結果ヘッダー */}
          <div>
            <div className="h-8 bg-gray-200 rounded animate-pulse mb-2 w-32"></div>
            <div className="h-5 bg-gray-200 rounded animate-pulse w-48"></div>
          </div>

          {/* 記事カードのスケルトン */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg border border-gray-200 p-6"
              >
                {/* カテゴリバッジ */}
                <div className="h-6 bg-gray-200 rounded-full animate-pulse mb-3 w-20"></div>

                {/* タイトル */}
                <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-6 bg-gray-200 rounded animate-pulse mb-3 w-3/4"></div>

                {/* 抜粋 */}
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-4 w-4/6"></div>

                {/* メタ情報 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
