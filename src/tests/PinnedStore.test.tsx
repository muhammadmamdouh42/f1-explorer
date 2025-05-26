import { act } from "react";
import { describe, it, expect, beforeEach } from "vitest";
import { usePinnedRaces } from "../store/pinnedRaces";

describe("usePinnedRaces store", () => {
  beforeEach(() => usePinnedRaces.setState({ pinned: [] }));

  it("toggles races and persists state", () => {
    const race = { season: "2024", round: "1" };

    act(() => usePinnedRaces.getState().toggle(race));
    expect(usePinnedRaces.getState().isPinned(race)).toBe(true);

    act(() => usePinnedRaces.getState().toggle(race));
    expect(usePinnedRaces.getState().pinned).toHaveLength(0);
  });
});
