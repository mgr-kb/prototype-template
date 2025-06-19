export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: Author;
  category: Category;
  tags: string[];
  publishedAt: Date;
  updatedAt: Date;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  readingTime: number; // 分
  featured: boolean;
}

export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  role: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string; // Tailwind color class
}

export interface Comment {
  id: string;
  articleId: string;
  author: string;
  content: string;
  createdAt: Date;
  likes: number;
}

export interface AnalyticsMetrics {
  totalViews: number;
  uniqueVisitors: number;
  avgSessionDuration: number; // 秒
  bounceRate: number; // パーセンテージ
  topReferrers: Referrer[];
  viewsByDate: ViewMetric[];
}

export interface Referrer {
  source: string;
  count: number;
  percentage: number;
}

export interface ViewMetric {
  date: string;
  views: number;
  uniqueViews: number;
}
