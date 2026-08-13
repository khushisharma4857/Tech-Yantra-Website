import { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { HelmetProvider } from "react-helmet-async";
import HomePage from "./pages/HomePage";
import WorkPage from "./pages/WorkPage";
import NotFoundPage from "./pages/NotFoundPage";
import WhatsAppButton from "./components/WhatsAppButton";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";

const Antigravity = lazy(() => import("./components/Antigravity"));

function App() {
  const location = useLocation();

  return (
    <HelmetProvider>
      <ScrollToTop />

      {/* Keyboard users can jump straight past the decorative background and
          nav into the page content. */}
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      {/* Purely decorative: if WebGL is unavailable or the chunk fails to
          load, the site must still render normally. */}
      <ErrorBoundary>
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
              opacity={0.28}
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
      </ErrorBoundary>

      <div className="website-content">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>

        {/* Must live inside .website-content: that wrapper has z-index:1 and
            so forms a stacking context. Rendered as a sibling of it, this
            button painted above the open menu overlay no matter how high the
            overlay's z-index was raised. */}
        <WhatsAppButton />
      </div>
    </HelmetProvider>
  );
}

export default App;
