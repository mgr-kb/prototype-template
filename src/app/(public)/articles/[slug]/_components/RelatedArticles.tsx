import Link from 'next/link';
import { getRelatedArticles } from '@/lib/data-fetchers';
import type { Article } from '@/lib/types';

interface RelatedArticlesProps {
  articleId: string;
}

export async function RelatedArticles({ articleId }: RelatedArticlesProps) {
  // 時間ベースキャッシュ付きで関連記事を取得
  const relatedArticles = await getRelatedArticles(articleId, 4);

  if (relatedArticles.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No related articles found.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {relatedArticles.map((article) => (
        <RelatedArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}

function RelatedArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${article.category.color}`}
          >
            {article.category.name}
          </span>
          <time className="text-xs text-gray-500">
            {new Date(article.publishedAt).toLocaleDateString('ja-JP')}
          </time>
        </div>

        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {article.title}
        </h3>

        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm text-gray-700">{article.author.name}</span>
          </div>

          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span>{article.viewCount.toLocaleString()} views</span>
            <span>{article.readingTime} min</span>
          </div>
        </div>

        {/* タグ（最大3個まで表示） */}
        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {article.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs"
              >
                #{tag}
              </span>
            ))}
            {article.tags.length > 3 && (
              <span className="text-xs text-gray-500">
                +{article.tags.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
