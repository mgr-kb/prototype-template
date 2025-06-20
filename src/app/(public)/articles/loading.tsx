import { ArticleList } from '@/components/features/ArticleList';

export default function ArticlesLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">記事一覧</h1>

      {/* カテゴリフィルターのスケルトン */}
      <div className="flex flex-wrap gap-2 mb-6">
        <div className="px-4 py-2 rounded-full bg-gray-200 animate-pulse w-16 h-8"></div>
        <div className="px-4 py-2 rounded-full bg-gray-200 animate-pulse w-20 h-8"></div>
        <div className="px-4 py-2 rounded-full bg-gray-200 animate-pulse w-18 h-8"></div>
        <div className="px-4 py-2 rounded-full bg-gray-200 animate-pulse w-24 h-8"></div>
        <div className="px-4 py-2 rounded-full bg-gray-200 animate-pulse w-16 h-8"></div>
      </div>

      {/* 記事一覧のスケルトン */}
      <ArticleList
        articles={[]}
        loading={true}
        title="記事一覧"
        skeletonCount={12}
      />
    </div>
  );
}
