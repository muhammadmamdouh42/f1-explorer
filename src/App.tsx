import { Route, Routes, Navigate } from "react-router-dom";
import SeasonsPage from "./pages/SeasonsPage";
import SeasonRacesPage from "./pages/SeasonRacesPage";
import RaceDetailsPage from "./pages/RaceDetailsPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/seasons" replace />} />
      <Route path="/seasons" element={<SeasonsPage />} />
      <Route path="/season/:season" element={<SeasonRacesPage />} />
      <Route path="/season/:season/race/:round" element={<RaceDetailsPage />} />
    </Routes>
  );
}
