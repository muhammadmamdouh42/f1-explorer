import { render, screen, fireEvent } from "@testing-library/react";
import Toggle from "../components/ui/Toggle";

describe("Toggle (grid / list)", () => {
  it("shows correct icon state and fires onChange", () => {
    const spy = vi.fn();
    render(<Toggle value={false} onChange={spy} />);

    const listBtn = screen.getByRole("button", { name: /list view/i });
    const gridBtn = screen.getByRole("button", { name: /grid view/i });
    expect(listBtn).toHaveAttribute("aria-pressed", "true");
    expect(gridBtn).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(gridBtn);
    expect(spy).toHaveBeenCalledWith(true);
  });
});
