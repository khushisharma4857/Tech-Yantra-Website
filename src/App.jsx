import React, { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { HelmetProvider } from "react-helmet-async";
import HomePage from "./pages/HomePage";
import WorkPage from "./pages/WorkPage";
import NotFoundPage from "./pages/NotFoundPage";
import WhatsAppButton from "./components/WhatsAppButton";
import ScrollToTop from "./components/ScrollToTop";

const Antigravity = lazy(() => import("./components/Antigravity"));

function App() {
  const location = useLocation();

  return (
    <HelmetProvider>
      <ScrollToTop />
      <div className="antigravity-background" aria-hidden="true">
        <Suspense fallback={null}>
          <Antigravity
            count={80}
            magnetRadius={18}
            ringRadius={8}
            waveSpeed={1.2}
            waveAmplitude={1.2}
            particleSize={0.6}
            lerpSpeed={0.5}
            color="#E30613"
            autoAnimate
            particleVariance={1}
            rotationSpeed={0.4}
            depthFactor={1}
            pulseSpeed={5}
            particleShape="sphere"
            fieldStrength={15}
          />
        </Suspense>
      </div>

      <div className="website-content">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
      </div>

      <WhatsAppButton />
    </HelmetProvider>
  );
}

export default App;