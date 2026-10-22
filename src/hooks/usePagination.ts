import { useState, useCallback, useMemo } from 'react';

interface UsePaginationOptions<T> {
  initialLimit?: number;
  items: T[];
}

export function usePagination<T>({ initialLimit = 5, items }: UsePaginationOptions<T>) {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const paginatedItems = useMemo(() => {
    const end = currentPage * initialLimit;
    return items.slice(0, end);
  }, [items, currentPage, initialLimit]);

  const hasMore = useMemo(() => {
    return paginatedItems.length < items.length;
  }, [paginatedItems.length, items.length]);

  const loadMore = useCallback(() => {
    if (hasMore) {
      setCurrentPage(prev => prev + 1);
    }
  }, [hasMore]);

  const resetPagination = useCallback(() => {
    setCurrentPage(1);
  }, []);

  return {
    paginatedItems,
    hasMore,
    loadMore,
    resetPagination,
    currentPage,
    totalItems: items.length,
  };
}
