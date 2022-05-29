import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dao from "./components/dao";
import Dashboard from "./components/Dashboard";
import OnBoarding from "./components/onboarding";
import Settings from "./components/Settings";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dao />} />{" "}
          <Route path="/dashboard" element={<Dashboard />} />{" "}
          <Route path="/onboard" element={<OnBoarding />} />{" "}
          <Route path="/settings/:id" element={<Settings />} />
          <Route path="*" element={<Dao />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
