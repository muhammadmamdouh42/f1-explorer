import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PinnedRace {
  season: string;
  round: string;
}

interface State {
  pinned: PinnedRace[];
  toggle: (race: PinnedRace) => void;
  isPinned: (race: PinnedRace) => boolean;
}

export const usePinnedRaces = create<State>()(
  persist(
    (set, get) => ({
      pinned: [],
      toggle: (race) => {
        const isPinned = get().pinned.some(
          (r) => r.season === race.season && r.round === race.round
        );
        set({
          pinned: isPinned
            ? get().pinned.filter(
                (r) => !(r.season === race.season && r.round === race.round)
              )
            : [...get().pinned, race],
        });
      },
      isPinned: (race) =>
        get().pinned.some(
          (r) => r.season === race.season && r.round === race.round
        ),
    }),
    {
      name: "pinned-races",
    }
  )
);
