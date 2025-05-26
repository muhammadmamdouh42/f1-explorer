import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { fetchRaces } from "../api/ergast";
import RaceCard from "../components/RaceCard";
import RaceListItem from "../components/RaceListItem";
import Toggle from "../components/ui/Toggle";
import Pagination from "../components/ui/Pagination";
import { useState, useMemo, useCallback } from "react";
import { usePinnedRaces } from "../hooks/usePinnedRaces";
import { usePagination } from "../hooks/usePagination";

interface ErgastRace {
  season: string;
  round: string;
  raceName: string;
  date: string;
  Circuit: { circuitName: string };
}

export default function SeasonRacesPage() {
  const { season = "" } = useParams();

  const fetchFn = useCallback(() => fetchRaces(season), [season]);
  const {
    data: races,
    loading,
    error,
  } = useFetch<ErgastRace[]>(fetchFn);

  const [cardView, setCardView] = useState(true);
  const { pinned } = usePinnedRaces();

  const sorted: ErgastRace[] = useMemo(() => {
    if (!races) return [];
    return [...races].sort((a, b) => {
      const aPinned = pinned.some(
        (r) => r.round === a.round && r.season === a.season
      );
      const bPinned = pinned.some(
        (r) => r.round === b.round && r.season === b.season
      );
      if (aPinned === bPinned) return Number(a.round) - Number(b.round);
      return aPinned ? -1 : 1;
    });
  }, [races, pinned]);

  const { page, pages, paged, setPage } = usePagination(sorted, 10);

  if (loading) return <p className="p-4">Loading races…</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Season {season}</h1>
        <Toggle
          value={cardView}
          onChange={setCardView}
          label={cardView ? "Card view" : "List view"}
        />
      </header>

      {cardView ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {paged.map((race) => (
            <RaceCard key={race.round} race={race} />
          ))}
        </div>
      ) : (
        <ul className="divide-y">
          {paged.map((race) => (
            <RaceListItem key={race.round} race={race} />
          ))}
        </ul>
      )}

      <Pagination page={page} pages={pages} onChange={setPage} />
    </div>
  );
}
