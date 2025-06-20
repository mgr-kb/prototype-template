interface ArticleContentProps {
  content: string;
  excerpt: string;
}

export function ArticleContent({ content, excerpt }: ArticleContentProps) {
  return (
    <article className="prose prose-lg max-w-none">
      {/* 記事の概要 */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
        <p className="text-blue-800 font-medium italic leading-relaxed">
          {excerpt}
        </p>
      </div>

      {/* 記事本文 */}
      <div className="text-gray-800 leading-relaxed">
        {/* 簡単なマークダウン風の表示（実際のプロジェクトではmarkdownパーサーを使用） */}
        {content.split('\n\n').map((paragraph, index) => {
          // 見出し処理
          if (paragraph.startsWith('# ')) {
            return (
              <h2
                key={index}
                className="text-2xl font-bold text-gray-900 mt-8 mb-4"
              >
                {paragraph.replace('# ', '')}
              </h2>
            );
          }

          if (paragraph.startsWith('## ')) {
            return (
              <h3
                key={index}
                className="text-xl font-semibold text-gray-900 mt-6 mb-3"
              >
                {paragraph.replace('## ', '')}
              </h3>
            );
          }

          // リスト処理
          if (paragraph.includes('- ')) {
            const listItems = paragraph
              .split('\n')
              .filter((line) => line.startsWith('- '));
            return (
              <ul key={index} className="list-disc list-inside space-y-2 my-4">
                {listItems.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-gray-700">
                    {item.replace('- ', '')}
                  </li>
                ))}
              </ul>
            );
          }

          // 通常の段落
          return (
            <p key={index} className="mb-6 text-gray-700 leading-relaxed">
              {paragraph}
            </p>
          );
        })}
      </div>

      {/* ソーシャルシェアボタン */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center gap-4">
          <span className="font-medium text-gray-700">Share this article:</span>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm">
              Twitter
            </button>
            <button className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900 transition-colors text-sm">
              Facebook
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm">
              LINE
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
