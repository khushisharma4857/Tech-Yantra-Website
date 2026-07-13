import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage";
import WorkPage from "./pages/workPage";
import Antigravity from "./components/Antigravity";
import WhatsAppButton from "./components/WhatsAppButton";

function App() {
  return (
    <>
      <div className="antigravity-background">
        <Antigravity
          count={350}
          magnetRadius={18}
          ringRadius={8}
          waveSpeed={1.2}
          waveAmplitude={1.2}
          particleSize={1.5}
          lerpSpeed={0.5}
          color="#E30613"
          autoAnimate
          particleVariance={1}
          rotationSpeed={0.4}
          depthFactor={1}
          pulseSpeed={5}
          particleShape="capsule"
          fieldStrength={25}
        />
      </div>

      <div className="website-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work" element={<WorkPage />} />
        </Routes>
      </div>

      <WhatsAppButton />
    </>
  );
}

export default App;