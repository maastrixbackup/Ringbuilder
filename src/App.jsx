import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { RingBuilderProvider } from "./context/RingBuilderContext";
const SettingsPage = lazy(() => import("./Components/firststep/settingspage"));
const DiamondsPage = lazy(() => import("./Components/firststep/diamondpage"));
const CompleteRingPage = lazy(() =>
  import("./Components/firststep/completeringpage")
);
import "../style.css";
import DummyPage from "./Components/firststep/dummyPage";
import "bootstrap/dist/css/bootstrap.min.css";

import Loader from "../src/utils/loader";

export default function App() {
  return (
    <RingBuilderProvider>
      <Router basename="/">
        <Suspense fallback={<Loader />}>
          <Routes>
            {/* <Route path="/" element={<Navigate to="/settings" />} /> */}
            <Route path="/ring_builder" element={<SettingsPage />} />
            <Route path="/diamonds" element={<DiamondsPage />} />
            <Route path="/complete-ring" element={<CompleteRingPage />} />
            <Route path="/test" element={<DummyPage />} />
          </Routes>
        </Suspense>
      </Router>
    </RingBuilderProvider>
  );
}
