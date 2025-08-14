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
const RingDetails = lazy(() => import("./Components/firststep/ring-details"));
import "../style.css";
import DummyPage from "./Components/firststep/dummyPage";
import "bootstrap/dist/css/bootstrap.min.css";

import Loader from "../src/utils/loader";
import Home from "./pages/Home";

export default function App() {
  return (
    <RingBuilderProvider>
      <Router>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/rings" element={<SettingsPage />} />
              <Route path="/diamonds" element={<DiamondsPage />} />
              <Route path="/complete-ring" element={<CompleteRingPage />} />
              <Route path="/ring-details" element={<RingDetails />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </Suspense>
      </Router>
    </RingBuilderProvider>
  );
}
