import type {
  Article,
  Author,
  Category,
  Comment,
  AnalyticsMetrics,
  ViewMetric,
} from './types';

// 固定データの定義
const AUTHORS: Author[] = [
  {
    id: 'author-1',
    name: '山田太郎',
    avatar: '/avatars/yamada.jpg',
    bio: 'フルスタックエンジニア。Next.jsとTypeScriptが得意です。',
    role: 'Senior Developer',
  },
  {
    id: 'author-2',
    name: '佐藤花子',
    avatar: '/avatars/sato.jpg',
    bio: 'フロントエンドエンジニア。UI/UXデザインにも興味があります。',
    role: 'Frontend Developer',
  },
  {
    id: 'author-3',
    name: '鈴木一郎',
    avatar: '/avatars/suzuki.jpg',
    bio: 'バックエンドエンジニア。クラウドアーキテクチャが専門です。',
    role: 'Backend Developer',
  },
  {
    id: 'author-4',
    name: '田中美咲',
    avatar: '/avatars/tanaka.jpg',
    bio: 'DevOpsエンジニア。CI/CDパイプラインの構築が得意です。',
    role: 'DevOps Engineer',
  },
];

export const CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'Next.js',
    slug: 'nextjs',
    description: 'Next.js関連の記事',
    color: 'blue',
  },
  {
    id: 'cat-2',
    name: 'TypeScript',
    slug: 'typescript',
    description: 'TypeScript関連の記事',
    color: 'indigo',
  },
  {
    id: 'cat-3',
    name: 'React',
    slug: 'react',
    description: 'React関連の記事',
    color: 'cyan',
  },
  {
    id: 'cat-4',
    name: 'Performance',
    slug: 'performance',
    description: 'パフォーマンス最適化の記事',
    color: 'green',
  },
  {
    id: 'cat-5',
    name: 'Testing',
    slug: 'testing',
    description: 'テスト関連の記事',
    color: 'purple',
  },
];

// タイトルテンプレート
const TITLE_TEMPLATES = [
  '{category}の基礎から応用まで完全ガイド',
  '{category}で実装する{feature}',
  '{category}のベストプラクティス{year}年版',
  '初心者でもわかる{category}入門',
  '{category}における{pattern}パターンの活用',
  '{category}のパフォーマンス最適化テクニック',
  '{category}での{problem}の解決方法',
  '{category}を使った{project}の構築',
  '{category}の新機能を徹底解説',
  '{category}のテスト戦略完全ガイド',
];

const FEATURES = [
  'リアルタイムチャット',
  'ダッシュボード',
  'ECサイト',
  'ブログシステム',
  'タスク管理アプリ',
  'SNSクローン',
  '画像ギャラリー',
  'カレンダーアプリ',
];

const PATTERNS = [
  'コンポジション',
  'レンダリング',
  'データフェッチング',
  'ステート管理',
  'エラーハンドリング',
  'キャッシング',
];

const PROBLEMS = [
  'パフォーマンス問題',
  'SEO対策',
  'アクセシビリティ',
  'セキュリティ課題',
  'スケーラビリティ',
  'メモリリーク',
];

const PROJECTS = [
  'SaaSアプリケーション',
  'コーポレートサイト',
  'ポートフォリオサイト',
  'オンラインストア',
  'ドキュメントサイト',
  'ランディングページ',
];

// ========================================
// ステップ3: ランダムデータ生成ヘルパー関数
// ========================================

// ランダムな要素を選択
function randomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

// ランダムな複数要素を選択（重複なし）
function randomElements<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// ランダムな数値を生成（範囲指定）
function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ランダムな日付を生成（過去n日以内）
function randomDate(daysAgo: number): Date {
  const date = new Date();
  date.setDate(date.getDate() - randomNumber(0, daysAgo));
  date.setHours(randomNumber(0, 23));
  date.setMinutes(randomNumber(0, 59));
  return date;
}

// slugを生成
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ========================================
// 記事コンテンツ生成
// ========================================

function generateArticleContent(title: string, category: string): string {
  const sections = randomNumber(3, 6);
  let content = `# ${title}\n\n`;

  content += `この記事では、${category}について詳しく解説していきます。\n\n`;

  for (let i = 1; i <= sections; i++) {
    content += `## セクション${i}: ${generateSectionTitle(category)}\n\n`;
    content += generateParagraph(category) + '\n\n';

    // コードブロックを含める場合がある
    if (Math.random() > 0.5) {
      content += '```typescript\n';
      content += generateCodeSnippet(category);
      content += '\n```\n\n';
    }

    content += generateParagraph(category) + '\n\n';
  }

  content += '## まとめ\n\n';
  content += `今回は${category}について解説しました。これらのテクニックを活用して、より良いアプリケーションを構築していきましょう。\n`;

  return content;
}

function generateSectionTitle(category: string): string {
  const titles = [
    `${category}の基本概念`,
    `${category}の実装方法`,
    `${category}のベストプラクティス`,
    `${category}の注意点`,
    `${category}の応用例`,
    `${category}のトラブルシューティング`,
  ];
  return randomElement(titles);
}

function generateParagraph(category: string): string {
  const paragraphs = [
    `${category}を使用することで、開発効率が大幅に向上します。特に、大規模なアプリケーションにおいては、その恩恵を強く感じることができるでしょう。`,
    `最新のバージョンでは、${category}に多くの改善が加えられました。パフォーマンスの向上やDXの改善により、より快適な開発体験が可能になっています。`,
    `実際のプロジェクトで${category}を活用する際は、チーム全体で統一されたルールを設けることが重要です。これにより、コードの一貫性が保たれ、メンテナンスが容易になります。`,
    `${category}の学習曲線は比較的緩やかですが、高度な機能を使いこなすには継続的な学習が必要です。公式ドキュメントやコミュニティのリソースを活用しましょう。`,
  ];
  return randomElement(paragraphs);
}

function generateCodeSnippet(category: string): string {
  const snippets: Record<string, string> = {
    'Next.js': `export default function Page() {
  return (
    <div className="container">
      <h1>Welcome to Next.js</h1>
    </div>
  );
}`,
    TypeScript: `interface User {
  id: string;
  name: string;
  email: string;
}

function getUser(id: string): User {
  // 実装
}`,
    React: `const Component = () => {
  const [state, setState] = useState(0);
  
  return <div>{state}</div>;
};`,
    Performance: `// メモ化による最適化
const MemoizedComponent = React.memo(Component, (prev, next) => {
  return prev.id === next.id;
});`,
    Testing: `test('should render correctly', () => {
  const { getByText } = render(<Component />);
  expect(getByText('Hello')).toBeInTheDocument();
});`,
  };

  return snippets[category] || snippets['Next.js'];
}

// ========================================
// メイン生成関数
// ========================================

export function generateMockArticles(count: number): Article[] {
  const articles: Article[] = [];

  for (let i = 1; i <= count; i++) {
    const category = randomElement(CATEGORIES);
    const author = randomElement(AUTHORS);
    const publishedAt = randomDate(90); // 過去90日以内

    // タイトル生成
    const titleTemplate = randomElement(TITLE_TEMPLATES);
    const title = titleTemplate
      .replace('{category}', category.name)
      .replace('{feature}', randomElement(FEATURES))
      .replace('{pattern}', randomElement(PATTERNS))
      .replace('{problem}', randomElement(PROBLEMS))
      .replace('{project}', randomElement(PROJECTS))
      .replace('{year}', '2024');

    const article: Article = {
      id: `article-${i}`,
      slug: generateSlug(title) + `-${i}`,
      title,
      excerpt: `${title}についての詳細な解説記事です。初心者から上級者まで幅広く参考になる内容となっています。`,
      content: generateArticleContent(title, category.name),
      author,
      category,
      tags: randomElements(
        [
          '初心者向け',
          '中級者向け',
          '上級者向け',
          'Tips',
          'ハンズオン',
          '解説',
        ],
        randomNumber(2, 4)
      ),
      publishedAt,
      updatedAt: new Date(
        publishedAt.getTime() + randomNumber(0, 7) * 24 * 60 * 60 * 1000
      ),
      viewCount: randomNumber(100, 10000),
      likeCount: randomNumber(10, 500),
      commentCount: randomNumber(0, 50),
      readingTime: randomNumber(3, 15),
      featured: i <= 3, // 最初の3記事をfeaturedに
    };

    articles.push(article);
  }

  return articles.sort(
    (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime()
  );
}

// ========================================
// コメントデータ生成
// ========================================

const COMMENT_AUTHORS = [
  '匿名ユーザー',
  'Next.js初心者',
  'フロントエンドエンジニア',
  'バックエンドエンジニア',
  'フルスタック開発者',
  '学生エンジニア',
  'ベテランエンジニア',
];

const COMMENT_TEMPLATES = [
  'とても参考になりました！{specific}',
  '素晴らしい記事です。{specific}',
  '{specific}の部分が特に勉強になりました。',
  'この方法で実装してみたところ、うまくいきました！',
  '質問があります。{question}',
  '補足情報として、{addition}',
  'ありがとうございます。{thanks}',
];

const SPECIFICS = [
  'コードの書き方',
  'パフォーマンスの改善方法',
  'エラーハンドリングの実装',
  'テストの書き方',
  'デプロイの手順',
];

const QUESTIONS = [
  'TypeScriptでの型定義はどうすればよいでしょうか？',
  'この方法はNext.js 13でも使えますか？',
  'パフォーマンスへの影響はありますか？',
  'もう少し詳しく説明していただけますか？',
];

const ADDITIONS = [
  '公式ドキュメントにも詳しい説明があります',
  '別の方法としてはこんなアプローチもあります',
  '最新バージョンでは仕様が変更されています',
  'このライブラリを使うとより簡単に実装できます',
];

const THANKS = [
  '今後も記事を楽しみにしています',
  '他の記事も読ませていただきます',
  'とても分かりやすい説明でした',
  '実務で活用させていただきます',
];

export function generateMockComments(articleCount: number): Comment[] {
  const comments: Comment[] = [];

  for (let articleId = 1; articleId <= articleCount; articleId++) {
    const commentCount = randomNumber(0, 10);

    for (let i = 0; i < commentCount; i++) {
      const template = randomElement(COMMENT_TEMPLATES);
      const content = template
        .replace('{specific}', randomElement(SPECIFICS))
        .replace('{question}', randomElement(QUESTIONS))
        .replace('{addition}', randomElement(ADDITIONS))
        .replace('{thanks}', randomElement(THANKS));

      const comment: Comment = {
        id: `comment-${articleId}-${i}`,
        articleId: `article-${articleId}`,
        author: randomElement(COMMENT_AUTHORS),
        content,
        createdAt: randomDate(30),
        likes: randomNumber(0, 20),
      };

      comments.push(comment);
    }
  }

  return comments.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

// ========================================
// アナリティクスデータ生成
// ========================================

export function generateMockAnalytics(): AnalyticsMetrics {
  // 過去30日分のビューデータを生成
  const viewsByDate: ViewMetric[] = [];
  const today = new Date();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];

    viewsByDate.push({
      date: dateStr,
      views: randomNumber(1000, 5000),
      uniqueViews: randomNumber(500, 2500),
    });
  }

  const totalViews = viewsByDate.reduce((sum, day) => sum + day.views, 0);
  const uniqueVisitors = viewsByDate.reduce(
    (sum, day) => sum + day.uniqueViews,
    0
  );

  const referrers = [
    { source: 'Google', count: randomNumber(1000, 3000), percentage: 0 },
    { source: 'Twitter', count: randomNumber(500, 1500), percentage: 0 },
    { source: 'GitHub', count: randomNumber(300, 800), percentage: 0 },
    { source: 'Direct', count: randomNumber(200, 600), percentage: 0 },
    { source: 'Others', count: randomNumber(100, 300), percentage: 0 },
  ];

  const totalReferrers = referrers.reduce((sum, ref) => sum + ref.count, 0);
  referrers.forEach((ref) => {
    ref.percentage = Math.round((ref.count / totalReferrers) * 100);
  });

  return {
    totalViews,
    uniqueVisitors,
    avgSessionDuration: randomNumber(120, 300),
    bounceRate: randomNumber(30, 70),
    topReferrers: referrers,
    viewsByDate,
  };
}
