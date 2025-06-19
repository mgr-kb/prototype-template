import { fetchPopularArticles } from '@/lib/data-fetchers';
import { ArticleCard } from '@/components/ui/ArticleCard';

export async function PopularArticles() {
  const articles = await fetchPopularArticles(6);

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">人気記事</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
