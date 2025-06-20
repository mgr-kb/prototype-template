import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from './index';

describe('Pagination', () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 10,
    onPageChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('現在のページ番号が正しく表示されること', () => {
    // Arrange & Act
    render(<Pagination {...defaultProps} currentPage={3} />);

    // Assert
    const currentPageButton = screen.getByText('3');
    expect(currentPageButton).toHaveClass('bg-blue-600', 'text-white');
  });

  it('前のページボタンがクリック可能で、onPageChangeが呼ばれること', () => {
    // Arrange
    const mockOnPageChange = vi.fn();
    render(
      <Pagination
        {...defaultProps}
        currentPage={3}
        onPageChange={mockOnPageChange}
      />
    );

    // Act
    fireEvent.click(screen.getByText('前へ'));

    // Assert
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('次のページボタンがクリック可能で、onPageChangeが呼ばれること', () => {
    // Arrange
    const mockOnPageChange = vi.fn();
    render(
      <Pagination
        {...defaultProps}
        currentPage={3}
        onPageChange={mockOnPageChange}
      />
    );

    // Act
    fireEvent.click(screen.getByText('次へ'));

    // Assert
    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });

  it('1ページ目では前のページボタンが無効化されること', () => {
    // Arrange & Act
    render(<Pagination {...defaultProps} currentPage={1} />);

    // Assert
    const prevButton = screen.getByText('前へ');
    expect(prevButton).toBeDisabled();
  });

  it('最後のページでは次のページボタンが無効化されること', () => {
    // Arrange & Act
    render(<Pagination {...defaultProps} currentPage={10} totalPages={10} />);

    // Assert
    const nextButton = screen.getByText('次へ');
    expect(nextButton).toBeDisabled();
  });

  it('ページ番号をクリックするとonPageChangeが呼ばれること', () => {
    // Arrange
    const mockOnPageChange = vi.fn();
    render(
      <Pagination
        {...defaultProps}
        currentPage={1}
        onPageChange={mockOnPageChange}
      />
    );

    // Act
    fireEvent.click(screen.getByText('5'));

    // Assert
    expect(mockOnPageChange).toHaveBeenCalledWith(5);
  });

  it('総ページ数が1の場合はページネーションが表示されないこと', () => {
    // Arrange & Act
    render(<Pagination {...defaultProps} totalPages={1} />);

    // Assert
    expect(screen.queryByText('前へ')).not.toBeInTheDocument();
    expect(screen.queryByText('次へ')).not.toBeInTheDocument();
  });

  it('ページ数が多い場合に省略記号が表示されること', () => {
    // Arrange & Act
    render(<Pagination {...defaultProps} currentPage={10} totalPages={20} />);

    // Assert
    expect(screen.getAllByText('...')).toHaveLength(2);
  });

  it('最初と最後のページが常に表示されること', () => {
    // Arrange & Act
    render(<Pagination {...defaultProps} currentPage={10} totalPages={20} />);

    // Assert
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
  });

  it('現在のページの前後2ページが表示されること', () => {
    // Arrange & Act
    render(<Pagination {...defaultProps} currentPage={10} totalPages={20} />);

    // Assert
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('9')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('11')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
  });
});
