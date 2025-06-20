import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { CommentsSection } from './CommentsSection';
import type { Comment } from '@/lib/types';

// Mock the data fetcher
vi.mock('@/lib/data-fetchers', () => ({
  getComments: vi.fn(),
}));

const { getComments } = await import('@/lib/data-fetchers');
const mockGetComments = vi.mocked(getComments);

const mockComments: Comment[] = [
  {
    id: '1',
    articleId: 'test-article',
    author: 'John Doe',
    content: 'This is a great article! Thanks for sharing.',
    createdAt: new Date('2024-01-01T10:00:00Z'),
    likes: 5,
  },
  {
    id: '2',
    articleId: 'test-article',
    author: 'Jane Smith',
    content:
      'I found this very helpful. Looking forward to more content like this.',
    createdAt: new Date('2024-01-02T15:30:00Z'),
    likes: 3,
  },
];

describe('CommentsSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render comments when data is available', async () => {
    mockGetComments.mockResolvedValue(mockComments);

    render(await CommentsSection({ articleId: 'test-article' }));

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(
      screen.getByText('This is a great article! Thanks for sharing.')
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'I found this very helpful. Looking forward to more content like this.'
      )
    ).toBeInTheDocument();
  });

  it('should display like counts correctly', async () => {
    mockGetComments.mockResolvedValue(mockComments);

    render(await CommentsSection({ articleId: 'test-article' }));

    await waitFor(() => {
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('should render empty state when no comments', async () => {
    mockGetComments.mockResolvedValue([]);

    render(await CommentsSection({ articleId: 'test-article' }));

    await waitFor(() => {
      expect(
        screen.getByText(
          'No comments yet. Be the first to share your thoughts!'
        )
      ).toBeInTheDocument();
    });

    expect(screen.getByText('Add Comment')).toBeInTheDocument();
  });

  it('should display user initials for avatars', async () => {
    mockGetComments.mockResolvedValue(mockComments);

    render(await CommentsSection({ articleId: 'test-article' }));

    await waitFor(() => {
      const initials = screen.getAllByText('J');
      expect(initials).toHaveLength(2); // Both John Doe and Jane Smith start with J
    });
  });

  it('should show Load More Comments button when comments exist', async () => {
    mockGetComments.mockResolvedValue(mockComments);

    render(await CommentsSection({ articleId: 'test-article' }));

    await waitFor(() => {
      expect(screen.getByText('Load More Comments')).toBeInTheDocument();
    });
  });

  it('should call getComments with correct articleId', async () => {
    mockGetComments.mockResolvedValue([]);
    const articleId = 'test-article-123';

    render(await CommentsSection({ articleId }));

    expect(mockGetComments).toHaveBeenCalledWith(articleId);
  });

  it('should render Reply buttons for each comment', async () => {
    mockGetComments.mockResolvedValue(mockComments);

    render(await CommentsSection({ articleId: 'test-article' }));

    await waitFor(() => {
      const replyButtons = screen.getAllByText('Reply');
      expect(replyButtons).toHaveLength(2);
    });
  });
});
