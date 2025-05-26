import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SeasonCard from "../components/SeasonCard";

it("renders season label and link", () => {
  render(
    <MemoryRouter>
      <SeasonCard season={{ season: "2023", url: "" }} />
    </MemoryRouter>
  );
  expect(screen.getByText("2023")).toBeInTheDocument();
  expect(screen.getByRole("link")).toHaveAttribute("href", "/season/2023");
});
