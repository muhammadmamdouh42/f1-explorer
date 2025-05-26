# Formula One Explorer

A lightweight **React + TypeScript + Vite** SPA for exploring Formula 1 seasons, races, and detailed results via the [Ergast API](https://ergast.com/mrd/).

---

## 🚀 Quick-start

| Action           | Command                                                                  |
| ---------------- | ------------------------------------------------------------------------ |
| **Clone**        | `git clone https://github.com/<your-fork>/f1-explorer && cd f1-explorer` |
| **Install deps** | `npm i`                                                                  |
| **Dev server**   | `npm run dev` → <http://localhost:5173>                                  |
| **Unit tests**   | `npm run test` → Vitest watch mode                                       |
| **E2E tests**    | `npm run cypress` (opens Cypress UI)                                     |

---

## 🗂️ Project structure

```
├─ src/
│  ├─ api/              REST helpers (Ergast)
│  ├─ components/       Re-usable UI (cards, toggle, paginator…)
│  ├─ hooks/            fetch, pagination, pinned-state
│  ├─ pages/            Seasons ▸ Races ▸ Race-details
│  ├─ store/            Zustand (pinned races)
│  ├─ tests/            Vitest unit suites
│  └─ index.css         Tailwind entrypoint
├─ cypress/
│  ├─ e2e/              Cypress specs (.cy.ts)
│  └─ support/          custom commands
└─ ...
```

---

## 🛠️ Technical approach & key decisions

| Area              | Choices & Rationale                                                                                                     |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Build**         | **Vite** for sub-20 ms HMR and zero-config TS.                                                                          |
| **State**         | **Zustand** (+ persist) – trivial API, no boilerplate, perfect for a single “pinned races” slice.                       |
| **Styling**       | **Tailwind v4** – utility-first, no runtime; custom components are just class strings.                                  |
| **Routing**       | `react-router-dom v6` (`/season/:year/race/:round`) – small bundle, lazy-loadable.                                      |
| **Data fetch**    | Tiny `useFetch` hook wraps `fetch` with loading/error; memoised via `useCallback`.                                      |
| **Pagination**    | Generic `usePagination`; Seasons page shows **12 items/page** (3 × 4 grid).                                             |
| **Charts**        | **Recharts** vertical bar – driver “gap to winner” √-scaled for clarity.                                                |
| **Accessibility** | Headless-UI `Tab` + custom segmented toggle use `<button>` + `aria-pressed`, full keyboard support.                     |
| **Testing**       | _Unit_: **Vitest** + React Testing Library (8 suites, 9 assertions).<br>_E2E_: **Cypress** cover happy-path navigation. |

---

## 🧪 Testing

### Unit (Vitest)

```bash
npm run test
```

- Globals (`describe`, `it`, `expect`) enabled via `vitest.config.ts`.
- `@testing-library/jest-dom` matchers included.
- JSDOM set up; `localStorage` stubbed for Zustand-persist.

### E2E (Cypress)

```bash
npm run cypress
```

Key specs:

| File             | Scenario                                   |
| ---------------- | ------------------------------------------ |
| **`home.cy.ts`** | Load Seasons ➜ toggle grid↔list ➜ paginate |

---

## ✨ UI Highlights

- Responsive card grid (2 cols mobile → 4 cols desktop, **12 seasons/page**).
- **Pinned races** float to top and persist across reloads.
- **Indigo highlight** for driver search.
- Fixed, keyboard-friendly paginator with smart ellipsis.
- Accessible segmented toggle.
- Uniform **“November 24, 2024”** date format.

---

## 🤝 Future ideas

- Skeleton loaders instead of “Loading…”.
- Lap-chart & team-colours in details view.

Happy racing 🏁
