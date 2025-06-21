export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      {/* ダッシュボードタイトル */}
      <div className="mb-8">
        <div className="h-8 bg-gray-200 animate-pulse rounded w-48"></div>
        <div className="h-4 bg-gray-200 animate-pulse rounded w-96 mt-2"></div>
      </div>

      {/* メトリクスカード */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <div className="h-4 bg-gray-200 animate-pulse rounded w-20 mb-2"></div>
                <div className="h-8 bg-gray-200 animate-pulse rounded w-16"></div>
              </div>
              <div className="h-8 w-8 bg-gray-200 animate-pulse rounded"></div>
            </div>
          </div>
        ))}
      </div>

      {/* グラフセクション */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="h-6 bg-gray-200 animate-pulse rounded w-32 mb-4"></div>
        <div className="h-64 bg-gray-200 animate-pulse rounded"></div>
      </div>

      {/* テーブルセクション */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6">
          <div className="h-6 bg-gray-200 animate-pulse rounded w-24 mb-4"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="h-4 bg-gray-200 animate-pulse rounded w-4 flex-shrink-0"></div>
                <div className="h-4 bg-gray-200 animate-pulse rounded flex-1"></div>
                <div className="h-4 bg-gray-200 animate-pulse rounded w-16 flex-shrink-0"></div>
                <div className="h-4 bg-gray-200 animate-pulse rounded w-12 flex-shrink-0"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
