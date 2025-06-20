export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Article header skeleton */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-6 bg-gray-200 rounded-full w-20 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
        </div>
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
      </div>

      {/* Author info skeleton */}
      <div className="flex items-center gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
        <div className="h-12 w-12 bg-gray-200 rounded-full animate-pulse"></div>
        <div>
          <div className="h-4 bg-gray-200 rounded w-24 mb-2 animate-pulse"></div>
          <div className="h-3 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="space-y-4 mb-12">
        <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
      </div>

      {/* Related articles skeleton */}
      <div className="border-t pt-8">
        <div className="h-6 bg-gray-200 rounded w-32 mb-6 animate-pulse"></div>
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="border rounded-lg p-4">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
