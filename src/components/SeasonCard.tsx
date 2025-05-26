import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";

interface Props {
  season: { season: string; url: string };
}

export default function SeasonCard({ season }: Props) {
  return (
    <Link
      to={`/season/${season.season}`}
      className="
        relative group overflow-hidden rounded-xl border border-gray-200
        bg-white shadow transition-transform duration-300 hover:-translate-y-1
        hover:shadow-md focus-visible:ring-2 ring-indigo-400
        h-48 flex flex-col justify-center
      "
    >
      <h3 className="text-4xl font-extrabold text-gray-800 text-center">
        {season.season}
      </h3>

      <HiArrowRight
        className="
          absolute bottom-3 right-3 text-gray-400
          group-hover:text-indigo-500 transition
        "
      />
    </Link>
  );
}
