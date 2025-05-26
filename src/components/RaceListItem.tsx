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

export default function RaceListItem({ race }: { race: Race }) {
  const { toggle, isPinned } = usePinnedRaces();
  const pinned = isPinned({ season: race.season, round: race.round });
  const navigate = useNavigate();

  return (
    <li
      onClick={() =>
        navigate(`/season/${race.season}/race/${race.round}`)
      }
      className="flex items-center justify-between px-4 py-3 hover:bg-gray-50
                 rounded-md transition cursor-pointer"
    >
      <div>
        <p className="font-medium">{race.raceName}</p>
        <p className="text-sm text-gray-600">
          {race.Circuit.circuitName} •{" "}
          {new Date(race.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <button
        aria-label="pin race"
        onClick={(e) => {
          e.stopPropagation();
          toggle({ season: race.season, round: race.round });
        }}
        className="text-xl text-yellow-400 hover:scale-110 transition"
      >
        {pinned ? <HiStar /> : <HiOutlineStar />}
      </button>
    </li>
  );
}
