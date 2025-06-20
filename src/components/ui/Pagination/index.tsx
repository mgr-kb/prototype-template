interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  // 総ページ数が1以下の場合は表示しない
  if (totalPages <= 1) {
    return null;
  }

  // ページ番号の範囲を計算する関数
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5; // 現在のページを中心に表示するページ数
    const sidePages = Math.floor(maxVisible / 2);

    // 開始と終了ページを計算
    let start = Math.max(1, currentPage - sidePages);
    let end = Math.min(totalPages, currentPage + sidePages);

    // 範囲を調整
    if (end - start + 1 < maxVisible) {
      if (start === 1) {
        end = Math.min(totalPages, start + maxVisible - 1);
      } else if (end === totalPages) {
        start = Math.max(1, end - maxVisible + 1);
      }
    }

    // 最初のページを追加
    if (start > 1) {
      pages.push(1);
      if (start > 2) {
        pages.push('...');
      }
    }

    // 中間のページを追加
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // 最後のページを追加
    if (end < totalPages) {
      if (end < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className="flex items-center justify-center gap-2 mt-8">
      {/* 前のページボタン */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
          currentPage === 1
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        前へ
      </button>

      {/* ページ番号 */}
      {pageNumbers.map((page, index) => {
        if (page === '...') {
          return (
            <span key={`ellipsis-${index}`} className="px-2 py-2 text-gray-500">
              ...
            </span>
          );
        }

        const pageNumber = page as number;
        const isCurrentPage = pageNumber === currentPage;

        return (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              isCurrentPage
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {pageNumber}
          </button>
        );
      })}

      {/* 次のページボタン */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
          currentPage === totalPages
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        次へ
      </button>
    </nav>
  );
}
