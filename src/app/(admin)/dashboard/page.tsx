import { Suspense } from 'react';
import { MetricsCard } from '@/components/ui/MetricsCard';
import { TopArticlesTable } from '@/components/features/TopArticlesTable';
import { fetchDashboardData } from '@/lib/data-fetchers-analytics';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Analytics Dashboard',
  description: 'Blog analytics and performance metrics',
};

// 分析メトリクスセクション（Suspense境界内）
async function AnalyticsMetricsSection() {
  const { analytics } = await fetchDashboardData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricsCard
        title="Total Views"
        value={analytics.totalViews}
        icon="📊"
        change={12.5}
        changeType="increase"
      />
      <MetricsCard
        title="Unique Visitors"
        value={analytics.uniqueVisitors}
        icon="👥"
        change={8.3}
        changeType="increase"
      />
      <MetricsCard
        title="Avg Session"
        value={analytics.avgSessionDuration / 60}
        unit="min"
        icon="⏱️"
        change={-2.1}
        changeType="decrease"
      />
      <MetricsCard
        title="Bounce Rate"
        value={analytics.bounceRate}
        unit="%"
        icon="📉"
        change={-5.4}
        changeType="decrease"
      />
    </div>
  );
}

// 人気記事セクション（Suspense境界内）
async function TopArticlesSection() {
  const { topArticles } = await fetchDashboardData();

  return <TopArticlesTable articles={topArticles} />;
}

// メトリクスローディング
function MetricsLoading() {
  return (
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
  );
}

// テーブルローディング
function TableLoading() {
  return (
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
  );
}

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* ダッシュボードヘッダー */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Analytics Dashboard
        </h1>
        <p className="mt-2 text-gray-600">
          Monitor your blog&apos;s performance and engagement metrics
        </p>
      </div>

      {/* メトリクスカード（個別のSuspense境界） */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Key Metrics
        </h2>
        <Suspense fallback={<MetricsLoading />}>
          <AnalyticsMetricsSection />
        </Suspense>
      </section>

      {/* トップ記事テーブル（個別のSuspense境界） */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Top Performing Articles
        </h2>
        <Suspense fallback={<TableLoading />}>
          <TopArticlesSection />
        </Suspense>
      </section>
    </div>
  );
}
