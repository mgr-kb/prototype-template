'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Pagination } from '@/components/ui/Pagination';

interface PaginationClientProps {
  currentPage: number;
  totalPages: number;
}

export function PaginationClient({
  currentPage,
  totalPages,
}: PaginationClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);

    if (page > 1) {
      params.set('page', page.toString());
    } else {
      params.delete('page');
    }

    const newUrl = `${pathname}?${params.toString()}`;
    router.push(newUrl);
  };

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
}
