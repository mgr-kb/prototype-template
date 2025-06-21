import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchForm } from './index';

// Mock Next.js router
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('SearchForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render search form with input and button', () => {
    render(<SearchForm />);

    expect(screen.getByPlaceholderText(/記事を検索/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /検索/ })).toBeInTheDocument();
  });

  it('should render category filter when categories are provided', () => {
    const categories = [
      {
        id: '1',
        name: 'Frontend',
        slug: 'frontend',
        description: '',
        color: 'blue',
      },
      {
        id: '2',
        name: 'Backend',
        slug: 'backend',
        description: '',
        color: 'green',
      },
    ];

    render(<SearchForm categories={categories} />);

    expect(screen.getByText('全て')).toBeInTheDocument();
    expect(screen.getByText('Frontend')).toBeInTheDocument();
    expect(screen.getByText('Backend')).toBeInTheDocument();
  });

  it('should navigate to search URL when form is submitted with valid query', async () => {
    render(<SearchForm />);

    const input = screen.getByPlaceholderText(/記事を検索/);
    const button = screen.getByRole('button', { name: /検索/ });

    await userEvent.type(input, 'test query');
    await userEvent.click(button);

    expect(mockPush).toHaveBeenCalledWith('/search?q=test+query');
  });

  it('should not navigate for short query', async () => {
    render(<SearchForm />);

    const input = screen.getByPlaceholderText(/記事を検索/);
    const button = screen.getByRole('button', { name: /検索/ });

    await userEvent.type(input, 'a');
    await userEvent.click(button);

    expect(mockPush).not.toHaveBeenCalled();
  });

  it('should include category in search URL when category is selected', async () => {
    const categories = [
      {
        id: '1',
        name: 'Frontend',
        slug: 'frontend',
        description: '',
        color: 'blue',
      },
    ];

    render(<SearchForm categories={categories} />);

    const input = screen.getByPlaceholderText(/記事を検索/);
    const categorySelect = screen.getByDisplayValue('全て');
    const button = screen.getByRole('button', { name: /検索/ });

    await userEvent.type(input, 'test');
    await userEvent.selectOptions(categorySelect, 'frontend');
    await userEvent.click(button);

    expect(mockPush).toHaveBeenCalledWith('/search?q=test&category=frontend');
  });

  it('should set initial values from props', () => {
    const categories = [
      {
        id: '1',
        name: 'Frontend',
        slug: 'frontend',
        description: '',
        color: 'blue',
      },
    ];

    render(
      <SearchForm
        categories={categories}
        initialQuery="React"
        initialCategory="frontend"
      />
    );

    const input = screen.getByPlaceholderText(/記事を検索/);
    const categorySelect = screen.getByDisplayValue('Frontend');

    expect(input).toHaveValue('React');
    expect(categorySelect).toHaveValue('frontend');
  });

  it('should show validation error for empty query', async () => {
    render(<SearchForm />);

    const button = screen.getByRole('button', { name: /検索/ });
    await userEvent.click(button);

    expect(mockPush).not.toHaveBeenCalled();
  });

  it('should show validation error for long query', async () => {
    render(<SearchForm />);

    const input = screen.getByPlaceholderText(/記事を検索/);
    const button = screen.getByRole('button', { name: /検索/ });

    await userEvent.type(input, 'a'.repeat(101));
    await userEvent.click(button);

    expect(mockPush).not.toHaveBeenCalled();
  });

  it('should not include empty category in URL', async () => {
    const categories = [
      {
        id: '1',
        name: 'Frontend',
        slug: 'frontend',
        description: '',
        color: 'blue',
      },
    ];

    render(<SearchForm categories={categories} />);

    const input = screen.getByPlaceholderText(/記事を検索/);
    const categorySelect = screen.getByDisplayValue('全て');
    const button = screen.getByRole('button', { name: /検索/ });

    await userEvent.type(input, 'test');
    await userEvent.selectOptions(categorySelect, '');
    await userEvent.click(button);

    expect(mockPush).toHaveBeenCalledWith('/search?q=test');
  });
});
