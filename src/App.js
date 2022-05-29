import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dao from "./components/dao";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dao />} />
          <Route path="*" element={<Dao />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
