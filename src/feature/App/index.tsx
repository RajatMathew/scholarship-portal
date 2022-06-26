import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "simplebar/dist/simplebar.min.css";
import Home from "../Home";
import Scholarship from "../Scholarship";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scholarship/:id" element={<Scholarship />} />
      </Routes>
    </Router>
  );
}

export default App;
