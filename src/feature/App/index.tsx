import React from "react";
import { Provider } from "react-redux";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "simplebar/dist/simplebar.min.css";
import { store } from "../../store/store";
import Home from "../Home";
import Scholarship from "../Scholarship";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scholarship/:id" element={<Scholarship />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
