import { render, screen } from '@testing-library/react';
import { ArticleContent } from './ArticleContent';

describe('ArticleContent', () => {
  const mockContent = `This is the first paragraph of the article.

This is the second paragraph with more content.

# Main Heading

This is content under the main heading.

## Sub Heading

This is content under the sub heading.

Here are some list items:
- First item
- Second item
- Third item

Final paragraph of the article.`;

  const mockExcerpt = 'This is a sample excerpt for the article.';

  it('should render the article excerpt in a highlighted box', () => {
    render(<ArticleContent content={mockContent} excerpt={mockExcerpt} />);

    expect(screen.getByText(mockExcerpt)).toBeInTheDocument();
    expect(screen.getByText(mockExcerpt).closest('div')).toHaveClass(
      'bg-blue-50'
    );
  });

  it('should render article content paragraphs', () => {
    render(<ArticleContent content={mockContent} excerpt={mockExcerpt} />);

    expect(
      screen.getByText('This is the first paragraph of the article.')
    ).toBeInTheDocument();
    expect(
      screen.getByText('This is the second paragraph with more content.')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Final paragraph of the article.')
    ).toBeInTheDocument();
  });

  it('should render headings correctly', () => {
    render(<ArticleContent content={mockContent} excerpt={mockExcerpt} />);

    const mainHeading = screen.getByText('Main Heading');
    expect(mainHeading).toBeInTheDocument();
    expect(mainHeading.tagName).toBe('H2');

    const subHeading = screen.getByText('Sub Heading');
    expect(subHeading).toBeInTheDocument();
    expect(subHeading.tagName).toBe('H3');
  });

  it('should render list items correctly', () => {
    render(<ArticleContent content={mockContent} excerpt={mockExcerpt} />);

    expect(screen.getByText('First item')).toBeInTheDocument();
    expect(screen.getByText('Second item')).toBeInTheDocument();
    expect(screen.getByText('Third item')).toBeInTheDocument();

    // Check if they are rendered as list items
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(3);
  });

  it('should render social share buttons', () => {
    render(<ArticleContent content={mockContent} excerpt={mockExcerpt} />);

    expect(screen.getByText('Share this article:')).toBeInTheDocument();
    expect(screen.getByText('Twitter')).toBeInTheDocument();
    expect(screen.getByText('Facebook')).toBeInTheDocument();
    expect(screen.getByText('LINE')).toBeInTheDocument();

    // Check if they are buttons
    const twitterButton = screen.getByRole('button', { name: 'Twitter' });
    const facebookButton = screen.getByRole('button', { name: 'Facebook' });
    const lineButton = screen.getByRole('button', { name: 'LINE' });

    expect(twitterButton).toBeInTheDocument();
    expect(facebookButton).toBeInTheDocument();
    expect(lineButton).toBeInTheDocument();
  });

  it('should have proper styling classes for social buttons', () => {
    render(<ArticleContent content={mockContent} excerpt={mockExcerpt} />);

    const twitterButton = screen.getByRole('button', { name: 'Twitter' });
    const facebookButton = screen.getByRole('button', { name: 'Facebook' });
    const lineButton = screen.getByRole('button', { name: 'LINE' });

    expect(twitterButton).toHaveClass('bg-blue-600');
    expect(facebookButton).toHaveClass('bg-blue-800');
    expect(lineButton).toHaveClass('bg-green-600');
  });

  it('should handle content without headings', () => {
    const simpleContent = 'Just a simple paragraph.';

    render(<ArticleContent content={simpleContent} excerpt={mockExcerpt} />);

    expect(screen.getByText('Just a simple paragraph.')).toBeInTheDocument();
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('should handle content without lists', () => {
    const contentWithoutLists = 'Paragraph one.\n\nParagraph two.';

    render(
      <ArticleContent content={contentWithoutLists} excerpt={mockExcerpt} />
    );

    expect(screen.getByText('Paragraph one.')).toBeInTheDocument();
    expect(screen.getByText('Paragraph two.')).toBeInTheDocument();
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('should have proper semantic structure', () => {
    render(<ArticleContent content={mockContent} excerpt={mockExcerpt} />);

    const article = screen.getByRole('article');
    expect(article).toBeInTheDocument();
    expect(article).toHaveClass('prose', 'prose-lg', 'max-w-none');
  });
});
