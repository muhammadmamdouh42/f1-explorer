import { renderHook, act } from "@testing-library/react";
import { usePagination } from "../hooks/usePagination";

it("paginates correctly", () => {
  const arr = Array.from({ length: 25 }, (_, i) => i);
  const { result } = renderHook(() => usePagination(arr, 10));

  expect(result.current.pages).toBe(3);
  expect(result.current.paged).toEqual(arr.slice(0, 10));

  act(() => result.current.setPage(3));
  expect(result.current.paged).toEqual(arr.slice(20, 30));
});
