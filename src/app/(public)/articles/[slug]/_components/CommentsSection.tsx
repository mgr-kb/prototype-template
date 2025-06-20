import { getComments } from '@/lib/data-fetchers';
import type { Comment } from '@/lib/types';

interface CommentsSectionProps {
  articleId: string;
}

export async function CommentsSection({ articleId }: CommentsSectionProps) {
  // Streamingのために遅延付きでコメントを取得
  const comments = await getComments(articleId);

  if (comments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No comments yet. Be the first to share your thoughts!</p>
        <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Add Comment
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}

      <div className="mt-8 pt-6 border-t border-gray-200">
        <button className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium">
          Load More Comments
        </button>
      </div>
    </div>
  );
}

function CommentItem({ comment }: { comment: Comment }) {
  const timeAgo = getTimeAgo(comment.createdAt);

  return (
    <div className="flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-lg">
      {/* アバター（簡易版） */}
      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
        <span className="text-gray-600 font-medium text-sm">
          {comment.author.charAt(0).toUpperCase()}
        </span>
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium text-gray-900">{comment.author}</h4>
          <time
            className="text-sm text-gray-500"
            dateTime={comment.createdAt.toISOString()}
          >
            {timeAgo}
          </time>
        </div>

        <p className="text-gray-700 leading-relaxed mb-3">{comment.content}</p>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition-colors">
            <span>👍</span>
            <span>{comment.likes}</span>
          </button>
          <button className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
            Reply
          </button>
        </div>
      </div>
    </div>
  );
}

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    if (diffInHours === 0) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return `${diffInMinutes}m ago`;
    }
    return `${diffInHours}h ago`;
  } else if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return `${weeks}w ago`;
  } else {
    const months = Math.floor(diffInDays / 30);
    return `${months}mo ago`;
  }
}
