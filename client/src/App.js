import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Signup/Login/Login";
import Signup from "./components/Signup/Signup";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;