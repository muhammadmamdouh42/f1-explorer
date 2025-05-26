import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { fetchRaceResults } from "../api/ergast";
import DriverRow from "../components/DriverRow";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  useState,
  useMemo,
  useCallback,
  Fragment,
} from "react";
import type {ReactNode} from "react";
import { Tab } from "@headlessui/react";

interface ErgastTime {
  millis: string;
  time: string;
}
interface ErgastResult {
  position: string;
  Driver: {
    driverId: string;
    givenName: string;
    familyName: string;
    nationality: string;
  };
  Constructor: { name: string };
  Time?: ErgastTime;
}
interface ErgastRace {
  raceName: string;
  Circuit: { circuitName: string };
  date: string;
  Results: ErgastResult[];
}

const Panel = ({ children }: { children: ReactNode }) => (
  <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-4">
    {children}
  </div>
);

export default function RaceDetailsPage() {
  const { season = "", round = "" } = useParams();

  const fetchFn = useCallback(
    () => fetchRaceResults(season, round),
    [season, round]
  );
  const { data: race, loading, error } = useFetch<ErgastRace | undefined>(
    fetchFn
  );

  const [highlight, setHighlight] = useState("");

  const chartData = useMemo(() => {
    if (!race) return [];

    const finishers = race.Results
      .filter((r) => r.Time?.millis)
      .map((r) => ({
        name: r.Driver.familyName,
        millis: Number(r.Time!.millis),
      }));

    if (!finishers.length) return [];

    const winnerMillis = Math.min(...finishers.map((r) => r.millis));
    return finishers
      .map(({ name, millis }) => {
        const gap = (millis - winnerMillis) / 1000;
        return { name, gap, visGap: Math.sqrt(gap) };
      })
      .sort((a, b) => a.gap - b.gap);
  }, [race]);

  if (loading) return <p className="p-6">Loading…</p>;
  if (error)
    return (
      <p className="p-6 text-red-600">
        {String(error) === "Failed to fetch"
          ? "Could not reach Ergast."
          : String(error)}
      </p>
    );
  if (!race) return null;

  const driverRows = race.Results.map((d) => (
    <DriverRow key={d.Driver.driverId} driver={d} highlight={highlight} />
  ));

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      <div className="rounded-xl border border-gray-200 bg-white shadow p-6">
        <h1 className="text-2xl font-bold mb-1">{race.raceName}</h1>
        <p className="text-lg font-medium text-gray-600">
          {race.Circuit.circuitName}
        </p>
        <p className="text-sm text-gray-500">
          {new Date(race.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <Tab.Group>
        <Tab.List className="flex gap-2">
          {["Drivers", "Performance"].map((label) => (
            <Tab
              key={label}
              className={({ selected }) =>
                [
                  "px-4 py-2 rounded-lg text-sm font-medium",
                  selected
                    ? "bg-indigo-600 text-white shadow"
                    : "bg-gray-100 hover:bg-gray-200",
                ].join(" ")
              }
            >
              {label}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels className="mt-3 space-y-6">
          <Tab.Panel as={Fragment}>
            <Panel>
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-semibold">Drivers</h2>
                <input
                  className="border rounded px-2 py-1 text-sm"
                  placeholder="Highlight…"
                  value={highlight}
                  onChange={(e) => setHighlight(e.target.value)}
                />
              </div>

              <div className="relative overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100 text-left">
                      {["Pos", "Driver", "Nationality", "Team", "Time"].map(
                        (h) => (
                          <th key={h} className="py-1.5 px-2 font-medium">
                            {h}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>{driverRows}</tbody>
                </table>
              </div>
            </Panel>
          </Tab.Panel>

          <Tab.Panel as={Fragment}>
            <Panel>
              <h2 className="text-xl font-semibold mb-3">Gap to winner</h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={chartData}
                  layout="vertical"
                  margin={{ left: 100 }}
                >
                  <XAxis
                    type="number"
                    domain={[0, "dataMax"]}
                    tickFormatter={(v: number) => `${(v * v).toFixed(0)}s`}
                  />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={100}
                    interval={0}
                  />
                  <Tooltip
                    formatter={(_: unknown, __, p) =>
                      `${p.payload.gap.toFixed(3)} s`
                    }
                    labelFormatter={(n) => `Driver: ${n}`}
                  />
                  <Bar dataKey="visGap" fill="#6366f1" />
                </BarChart>
              </ResponsiveContainer>
            </Panel>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
