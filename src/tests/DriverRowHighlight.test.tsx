import { render, screen } from "@testing-library/react";
import DriverRow from "../components/DriverRow";

const mockDriver = {
  position: "1",
  Driver: {
    givenName: "Max",
    familyName: "Verstappen",
    nationality: "Dutch",
  },
  Constructor: { name: "Red Bull" },
  Time: { time: "1:30:00.000" },
} as any;

it("highlights matching driver with indigo bg", () => {
  render(
    <table>
      <tbody>
        <DriverRow driver={mockDriver} highlight="vers" />
      </tbody>
    </table>
  );

  const row = screen.getByText(/Verstappen/).closest("tr");
  expect(row).toHaveClass("bg-indigo-100");
});
