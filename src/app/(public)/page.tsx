import { Suspense } from 'react';
import { TrendingArticles } from '@/components/features/TrendingArticles';
import { PopularArticles } from '@/components/features/PopularArticles';
import { ArticleCardSkeleton } from '@/components/ui/ArticleCardSkeleton';
import { fetchCategories } from '@/lib/data-fetchers';
import Link from 'next/link';

// PPRはcanary版でのみ利用可能
// export const experimental_ppr = true;

export default async function HomePage() {
  // 静的コンテンツ：カテゴリー一覧
  const categories = await fetchCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* ヒーローセクション - 静的 */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-12 text-white">
        <h1 className="text-4xl font-bold mb-4">
          最新のテクノロジー情報をお届け
        </h1>
        <p className="text-lg mb-6">
          エンジニアのための技術ブログ。最新のトレンドから実践的なチュートリアルまで。
        </p>
        <Link
          href="/articles"
          className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          記事を探す
        </Link>
      </div>

      {/* カテゴリーナビゲーション - 静的 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">カテゴリー</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/articles?category=${category.slug}`}
              className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${category.color} hover:opacity-80 transition-opacity`}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </section>

      {/* トレンド記事 - 動的（PPR） */}
      <Suspense
        fallback={
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">トレンド記事</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <ArticleCardSkeleton key={i} />
              ))}
            </div>
          </section>
        }
      >
        <TrendingArticles />
      </Suspense>

      {/* 人気記事 - 動的（Streaming） */}
      <Suspense
        fallback={
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">人気記事</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <ArticleCardSkeleton key={i} />
              ))}
            </div>
          </section>
        }
      >
        <PopularArticles />
      </Suspense>
    </div>
  );
}
