interface Driver {
  Driver: { givenName: string; familyName: string; nationality: string };
  Constructor: { name: string };
  position: string;
  Time?: { time: string };
}

interface Props {
  driver: Driver;
  highlight: string;
}

export default function DriverRow({ driver, highlight }: Props) {
  const name = `${driver.Driver.givenName} ${driver.Driver.familyName}`;
  const isHit =
    highlight && name.toLowerCase().includes(highlight.toLowerCase());

  const rowClass = isHit
    ? 
      "bg-indigo-100 text-gray-900 dark:bg-indigo-700 dark:text-white"
    : "";

  return (
    <tr className={rowClass}>
      <td className="py-1 px-2 border-b">{driver.position}</td>
      <td className="py-1 px-2 border-b">{name}</td>
      <td className="py-1 px-2 border-b">{driver.Driver.nationality}</td>
      <td className="py-1 px-2 border-b">{driver.Constructor.name}</td>
      <td className="py-1 px-2 border-b">
        {driver.Time?.time ?? "DNF"}
      </td>
    </tr>
  );
}
