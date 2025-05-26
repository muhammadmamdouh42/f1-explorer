import clsx from "clsx";

interface Props {
  page: number;
  pages: number;
  onChange: (p: number) => void;
}

export default function Pagination({ page, pages, onChange }: Props) {
  if (pages <= 1) return null;

  const items: number[] = [];
  for (let i = 1; i <= pages; i++) {
    if (i === 1 || i === pages || Math.abs(i - page) <= 2) {
      items.push(i);
    } else if (items[items.length - 1] !== -1) {
      items.push(-1); // ellipsis marker
    }
  }

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <ul className="flex items-center gap-1 text-sm select-none">
        <li>
          <button
            type="button"
            aria-label="Previous page"
            disabled={page === 1}
            onClick={() => onChange(page - 1)}
            className={clsx(
              "px-3 py-1 rounded-md border",
              page === 1
                ? "cursor-not-allowed text-gray-400 border-gray-200"
                : "hover:bg-gray-100 text-gray-700 border-gray-300"
            )}
          >
            Prev
          </button>
        </li>

        {items.map((n, idx) =>
          n === -1 ? (
            <li key={`ellipsis-${idx}`} className="px-2 text-gray-500">…</li>
          ) : (
            <li key={n}>
              <button
                type="button"
                aria-current={n === page ? "page" : undefined}
                onClick={() => onChange(n)}
                className={clsx(
                  "px-3 py-1 rounded-md border",
                  n === page
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-inner"
                    : "hover:bg-gray-100 text-gray-700 border-gray-300"
                )}
              >
                {n}
              </button>
            </li>
          )
        )}

        <li>
          <button
            type="button"
            aria-label="Next page"
            disabled={page === pages}
            onClick={() => onChange(page + 1)}
            className={clsx(
              "px-3 py-1 rounded-md border",
              page === pages
                ? "cursor-not-allowed text-gray-400 border-gray-200"
                : "hover:bg-gray-100 text-gray-700 border-gray-300"
            )}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
