import { useNavigate } from "react-router-dom";
import { usePinnedRaces } from "../hooks/usePinnedRaces";
import { HiOutlineStar, HiStar } from "react-icons/hi2";

interface Race {
  season: string;
  round: string;
  raceName: string;
  Circuit: { circuitName: string };
  date: string;
}

export default function RaceCard({ race }: { race: Race }) {
  const { toggle, isPinned } = usePinnedRaces();
  const pinned = isPinned({ season: race.season, round: race.round });
  const navigate = useNavigate();

  return (
    <div
      onClick={() =>
        navigate(`/season/${race.season}/race/${race.round}`)
      }
      className="relative rounded-xl border border-gray-200 bg-white shadow
                 hover:shadow-lg transition overflow-hidden cursor-pointer"
    >
      <button
        aria-label="pin race"
        onClick={(e) => {
          e.stopPropagation();
          toggle({ season: race.season, round: race.round });
        }}
        className="absolute top-3 right-3 text-2xl text-yellow-400
                   hover:scale-110 transition"
      >
        {pinned ? <HiStar /> : <HiOutlineStar />}
      </button>

      <div className="p-4 flex flex-col gap-1">
        <h3 className="text-lg font-semibold">{race.raceName}</h3>
        <p className="text-sm text-gray-600">{race.Circuit.circuitName}</p>
        <p className="text-xs text-gray-500">
          {new Date(race.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </div>
  );
}
