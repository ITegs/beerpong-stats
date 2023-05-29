import React, { useState } from "react";
import "./Home.css";

import Ranking from "../components/Ranking";
import PlayerCard from "../components/PlayerCard";
import GamesCard from "../components/GamesCard";
import AddPlayerCard from "../components/AddPlayerCard";

export default function Home() {
  const [showAddPlayer, setShowAddPlayer] = useState(false);

  return (
    <div>
      <Ranking />
      {showAddPlayer ? (
        <AddPlayerCard
          showAddPlayer={showAddPlayer}
          setShowAddPlayer={setShowAddPlayer}
        />
      ) : (
        <PlayerCard
          showAddPlayer={showAddPlayer}
          setShowAddPlayer={setShowAddPlayer}
        />
      )}
      <GamesCard />
    </div>
  );
}
