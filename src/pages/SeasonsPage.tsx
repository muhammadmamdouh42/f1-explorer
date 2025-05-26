import { useFetch } from "../hooks/useFetch";
import { fetchSeasons } from "../api/ergast";
import SeasonCard from "../components/SeasonCard";
import SeasonListItem from "../components/SeasonListItem";
import Toggle from "../components/ui/Toggle";
import Pagination from "../components/ui/Pagination";
import { usePagination } from "../hooks/usePagination";
import { useState, useMemo } from "react";

interface Season {
  season: string;
  url: string;
}

export default function SeasonsPage() {
  const { data: seasons, loading, error } = useFetch<Season[]>(fetchSeasons);
  const [cardView, setCardView] = useState(true);

  const sorted = useMemo(
    () =>
      seasons
        ? [...seasons].sort((a, b) => Number(b.season) - Number(a.season))
        : [],
    [seasons]
  );

  const { page, pages, paged, setPage } = usePagination(sorted, 12);

  if (loading) return <p className="p-4">Loading seasons…</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">F1 Seasons</h1>
        <Toggle
          value={cardView}
          onChange={setCardView}
          label={cardView ? "Grid" : "List"}
        />
      </header>

      {cardView ? (
        <div
          className="
            grid auto-rows-[1fr] gap-6
            grid-cols-2 sm:grid-cols-4
          "
        >
          {paged.map((s) => (
            <SeasonCard key={s.season} season={s} />
          ))}
        </div>
      ) : (
        <ul className="divide-y">
          {paged.map((s) => (
            <SeasonListItem key={s.season} season={s} />
          ))}
        </ul>
      )}

      <Pagination page={page} pages={pages} onChange={setPage} />
    </div>
  );
}
