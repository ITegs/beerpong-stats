import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";

export default function App() {
  const [active, setActive] = React.useState("home");

  return (
    <div className="App">
      <div className="Header">
        <Header />
      </div>
      <div className="sep" />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </HashRouter>
      {/* <div className="sep" />
      <div className="NavBar">
        <NavBar active={active} setActive={setActive} />
      </div> */}
    </div>
  );
}
