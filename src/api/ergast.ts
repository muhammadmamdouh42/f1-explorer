const BASE = "https://ergast.com/api/f1";

export interface Season {
  season: string;
  url: string;
}

export async function fetchSeasons(): Promise<Season[]> {
  const res = await fetch(`${BASE}/seasons.json?limit=1000`);
  if (!res.ok) throw new Error("Failed to fetch seasons");
  const data = await res.json();
  return data.MRData.SeasonTable.Seasons as Season[];
}

export async function fetchRaces(season: string) {
  const res = await fetch(`${BASE}/${season}/races.json?limit=1000`);
  if (!res.ok) throw new Error("Failed to fetch races");
  const data = await res.json();
  return data.MRData.RaceTable.Races;
}

export async function fetchRaceResults(season: string, round: string) {
  const res = await fetch(`${BASE}/${season}/${round}/results.json`);
  if (!res.ok) throw new Error("Failed to fetch race results");
  const data = await res.json();
  return data.MRData.RaceTable.Races[0];
}
