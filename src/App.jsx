import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import FormatMessage from "./pages/FormatMessage";
import GenerateMessageAI from "./pages/GenerateMessageAI";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/format" element={<FormatMessage />} />
        <Route path="/generate" element={<GenerateMessageAI />} />
      </Routes>
    </Router>
  );
}

export default App;