import type { Author } from '@/lib/types';

interface AuthorSectionProps {
  author: Author;
  publishedAt: Date;
}

export function AuthorSection({ author, publishedAt }: AuthorSectionProps) {
  const timeAgo = getTimeAgo(publishedAt);

  return (
    <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg mb-8">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={author.avatar}
        alt={author.name}
        className="w-16 h-16 rounded-full object-cover flex-shrink-0"
      />

      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">
              {author.name}
            </h3>
            <p className="text-gray-600 text-sm">{author.role}</p>
          </div>
          <div className="text-sm text-gray-500">
            <time dateTime={publishedAt.toISOString()}>
              Published {timeAgo}
            </time>
          </div>
        </div>

        {author.bio && (
          <p className="text-gray-700 mt-3 leading-relaxed">{author.bio}</p>
        )}
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
      return `${diffInMinutes} minutes ago`;
    }
    return `${diffInHours} hours ago`;
  } else if (diffInDays === 1) {
    return 'yesterday';
  } else if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  } else if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    return `${months} month${months > 1 ? 's' : ''} ago`;
  } else {
    const years = Math.floor(diffInDays / 365);
    return `${years} year${years > 1 ? 's' : ''} ago`;
  }
}
