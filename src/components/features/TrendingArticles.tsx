import { fetchTrendingArticles } from '@/lib/data-fetchers';
import { ArticleCard } from '@/components/ui/ArticleCard';

export async function TrendingArticles() {
  const articles = await fetchTrendingArticles(3);

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">トレンド記事</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
