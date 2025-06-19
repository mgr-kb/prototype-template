import type { Article } from '@/lib/types';
import Link from 'next/link';

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/articles/${article.slug}`}>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${article.category.color}`}
            >
              {article.category.name}
            </span>
            <time className="text-sm text-gray-500">
              {new Date(article.publishedAt).toLocaleDateString('ja-JP')}
            </time>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {article.title}
          </h3>

          <p className="text-gray-600 text-sm line-clamp-3 mb-4">
            {article.excerpt}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm text-gray-700">
                {article.author.name}
              </span>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>{article.viewCount.toLocaleString()} views</span>
              <span>{article.readingTime} min read</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
