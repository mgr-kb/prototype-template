import { render, screen } from '@testing-library/react';
import { AuthorSection } from './AuthorSection';
import type { Author } from '@/lib/types';

const mockAuthor: Author = {
  id: '1',
  name: 'Test Author',
  avatar: 'https://example.com/avatar.jpg',
  bio: 'This is a test author bio.',
  role: 'Senior Developer',
};

describe('AuthorSection', () => {
  it('should render author information correctly', () => {
    const publishedAt = new Date('2024-01-01');

    render(<AuthorSection author={mockAuthor} publishedAt={publishedAt} />);

    // Check if author name is displayed
    expect(screen.getByText('Test Author')).toBeInTheDocument();

    // Check if author role is displayed
    expect(screen.getByText('Senior Developer')).toBeInTheDocument();

    // Check if author bio is displayed
    expect(screen.getByText('This is a test author bio.')).toBeInTheDocument();

    // Check if avatar image is present with correct alt text
    const avatar = screen.getByAltText('Test Author');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });

  it('should display relative time correctly for recent dates', () => {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

    render(<AuthorSection author={mockAuthor} publishedAt={oneHourAgo} />);

    expect(screen.getByText('Published 1 hours ago')).toBeInTheDocument();
  });

  it('should display "yesterday" for dates from previous day', () => {
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    render(<AuthorSection author={mockAuthor} publishedAt={yesterday} />);

    expect(screen.getByText('Published yesterday')).toBeInTheDocument();
  });

  it('should handle author without bio', () => {
    const authorWithoutBio: Author = {
      ...mockAuthor,
      bio: '',
    };

    render(
      <AuthorSection author={authorWithoutBio} publishedAt={new Date()} />
    );

    expect(screen.getByText('Test Author')).toBeInTheDocument();
    expect(screen.getByText('Senior Developer')).toBeInTheDocument();
    // Bio should not be displayed if empty
    expect(
      screen.queryByText('This is a test author bio.')
    ).not.toBeInTheDocument();
  });
});
