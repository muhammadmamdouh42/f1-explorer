import { useMemo, useState } from "react";

export function usePagination<T>(items: T[] | null | undefined, pageSize = 20) {
  const [page, setPage] = useState(1);
  const total = items?.length ?? 0;
  const pages = Math.ceil(total / pageSize);

  const paged = useMemo(() => {
    if (!items) return [] as T[];
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, page, pageSize]);

  return { page, pages, setPage, paged } as const;
}
