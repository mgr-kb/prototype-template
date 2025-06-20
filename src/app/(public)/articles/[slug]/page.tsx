import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getArticle } from '@/lib/data-fetchers';
import { ArticleContent } from './_components/ArticleContent';
import { AuthorSection } from './_components/AuthorSection';
import { CommentsSection } from './_components/CommentsSection';
import { RelatedArticles } from './_components/RelatedArticles';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;

  // キャッシュされた記事データを取得
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* 記事ヘッダー */}
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${article.category.color}`}
          >
            {article.category.name}
          </span>
          <time className="text-gray-500">
            {new Date(article.publishedAt).toLocaleDateString('ja-JP', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <span>{article.readingTime} min read</span>
          <span>{article.viewCount.toLocaleString()} views</span>
          <span>{article.likeCount.toLocaleString()} likes</span>
          <span>{article.commentCount} comments</span>
        </div>

        {/* タグ */}
        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* 著者情報 */}
      <AuthorSection
        author={article.author}
        publishedAt={article.publishedAt}
      />

      {/* 記事本文 */}
      <ArticleContent content={article.content} excerpt={article.excerpt} />

      {/* コメントセクション（Streaming） */}
      <section className="mt-12 border-t pt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Comments ({article.commentCount})
        </h2>
        <Suspense
          fallback={
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          }
        >
          <CommentsSection articleId={article.id} />
        </Suspense>
      </section>

      {/* 関連記事 */}
      <section className="mt-12 border-t pt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Related Articles
        </h2>
        <Suspense
          fallback={
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="border rounded-lg p-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          }
        >
          <RelatedArticles articleId={article.id} />
        </Suspense>
      </section>
    </div>
  );
}

// メタデータの生成
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
    authors: [{ name: article.author.name }],
    keywords: article.tags,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt.toISOString(),
      authors: [article.author.name],
      tags: article.tags,
    },
  };
}
