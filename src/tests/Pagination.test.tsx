import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "../components/ui/Pagination";

describe("Pagination ellipsis logic", () => {
  it("renders Prev / Next & ellipsis, calls onChange", () => {
    const spy = vi.fn();
    render(<Pagination page={5} pages={10} onChange={spy} />);

    expect(screen.getAllByText("…").length).toBeGreaterThan(0);

    const prev = screen.getByRole("button", { name: /previous page/i });
    expect(prev).toBeEnabled();
    fireEvent.click(prev);
    expect(spy).toHaveBeenCalledWith(4);

    const next = screen.getByRole("button", { name: /next page/i });
    expect(next).toBeEnabled();
    fireEvent.click(next);
    expect(spy).toHaveBeenCalledWith(6);
  });

  it("disables Prev on first page", () => {
    render(<Pagination page={1} pages={3} onChange={() => {}} />);
    expect(
      screen.getByRole("button", { name: /previous page/i })
    ).toBeDisabled();
  });
});
