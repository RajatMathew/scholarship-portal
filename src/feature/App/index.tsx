import React from "react";
import { Provider } from "react-redux";
import { HashRouter as Router, Link, Route, Routes } from "react-router-dom";
import { store } from "../../store/store";
import Scholarship from "../Scholarship";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ul>
                <li>
                  <Link to="scholarship/1">Goto scholarship 1</Link>
                </li>
              </ul>
            }
          />
          <Route path="/scholarship/:id" element={<Scholarship />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
