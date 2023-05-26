import React from "react";
import "./Home.css";

import Ranking from "../components/Ranking";
import PlayerCard from "../components/PlayerCard";
import GamesCard from "../components/GamesCard";
import NavBar from "../components/NavBar";

export default function Home() {
  const [active, setActive] = React.useState("home");

  return (
    <div>
      <Ranking />
      <PlayerCard />
      <GamesCard />
      <div className="HomeNavBar">
        <NavBar active={active} setActive={setActive} />
      </div>
    </div>
  );
}
