// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./quizapp.css";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import Result from "./components/Result";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [soundOn, setSoundOn] = useState(true);

  // ✅ THIS FIXES BODY COLOR
  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
  }, [darkMode]);

  return (
    <Router>
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        soundOn={soundOn}
        setSoundOn={setSoundOn}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz/:topic" element={<Quiz soundOn={soundOn} />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  );
}

export default App;












