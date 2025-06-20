interface ArticleCardSkeletonProps {
  'data-testid'?: string;
}

export function ArticleCardSkeleton({
  'data-testid': testId,
}: ArticleCardSkeletonProps = {}) {
  return (
    <div
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse"
      data-testid={testId}
    >
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
        </div>

        <div className="h-6 bg-gray-200 rounded mb-2"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>

        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
