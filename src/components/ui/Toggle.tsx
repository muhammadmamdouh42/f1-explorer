import { HiViewGrid, HiViewList } from "react-icons/hi";
import clsx from "clsx";

interface Props {
  value: boolean;
  onChange: (v: boolean) => void;
  label?: string;
}

export default function Toggle({ value, onChange, label }: Props) {
  return (
    <div className="flex items-center gap-2">
      {label && <span className="text-sm text-gray-700">{label}</span>}

      <div
        role="group"
        aria-label="View style toggle"
        className="inline-flex rounded-full border border-gray-300 shadow-sm overflow-hidden"
      >
        <button
          type="button"
          onClick={() => onChange(false)}
          aria-pressed={!value}
          className={clsx(
            "px-3 py-1.5 flex items-center gap-1.5 text-sm",
            !value
              ? "bg-indigo-600 text-white"
              : "bg-white hover:bg-gray-50 text-gray-700"
          )}
        >
          <HiViewList />
          <span className="sr-only">List view</span>
        </button>

        <button
          type="button"
          onClick={() => onChange(true)}
          aria-pressed={value}
          className={clsx(
            "px-3 py-1.5 flex items-center gap-1.5 text-sm border-l border-gray-300",
            value
              ? "bg-indigo-600 text-white"
              : "bg-white hover:bg-gray-50 text-gray-700"
          )}
        >
          <HiViewGrid />
          <span className="sr-only">Grid view</span>
        </button>
      </div>
    </div>
  );
}
