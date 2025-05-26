import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";

interface Props {
  season: { season: string };
}

export default function SeasonListItem({ season }: Props) {
  return (
    <li>
      <Link
        to={`/season/${season.season}`}
        className="
          flex items-center justify-between px-4 py-3 rounded-md
          hover:bg-gray-100 transition
        "
      >
        <span className="font-medium">Season {season.season}</span>
        <HiArrowRight className="text-gray-400" />
      </Link>
    </li>
  );
}
