import { render, screen, fireEvent } from "@testing-library/react";
import SeasonsPage from "../pages/SeasonsPage";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";

vi.mock("../api/ergast", () => ({
  fetchSeasons: () =>
    Promise.resolve(
      Array.from({ length: 12 }, (_, i) => ({
        season: String(2024 - i),
        url: "",
      }))
    ),
}));

it("switches between grid & list views", async () => {
  render(
    <MemoryRouter>
      <SeasonsPage />
    </MemoryRouter>
  );
  expect(await screen.findByText("2024")).toBeInTheDocument();

  const gridBtn = screen.getByRole("button", { name: /grid view/i });
  const listBtn = screen.getByRole("button", { name: /list view/i });

  expect(gridBtn).toHaveAttribute("aria-pressed", "true");

  fireEvent.click(listBtn);
  expect(gridBtn).toHaveAttribute("aria-pressed", "false");
  expect(listBtn).toHaveAttribute("aria-pressed", "true");

  expect(screen.getAllByRole("listitem").length).toBeGreaterThan(0);
});
