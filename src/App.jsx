import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
const SettingsPage = lazy(() => import("./pages/settingspage"));
const DiamondsPage = lazy(() => import("./pages/diamondpage"));
const CompleteRingPage = lazy(() => import("./pages/completeringpage"));
const RingDetails = lazy(() => import("./pages/ring-details"));
import "../style.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Loader from "../src/utils/loader";
import Home from "./pages/Home";

export default function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}
