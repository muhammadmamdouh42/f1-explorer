import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RaceCard from "../components/RaceCard";
import { usePinnedRaces } from "../store/pinnedRaces";

beforeEach(() => usePinnedRaces.setState({ pinned: [] }));

it("pins & unpins a race", () => {
  const race = {
    season: "2023",
    round: "1",
    raceName: "Test GP",
    Circuit: { circuitName: "Somewhere" },
    date: "2023-03-15",
  } as any;

  render(
    <MemoryRouter>
      <RaceCard race={race} />
    </MemoryRouter>
  );

  const starBtn = screen.getByRole("button", { name: /pin race/i });
  fireEvent.click(starBtn);
  expect(usePinnedRaces.getState().pinned).toHaveLength(1);

  fireEvent.click(starBtn);
  expect(usePinnedRaces.getState().pinned).toHaveLength(0);
});
