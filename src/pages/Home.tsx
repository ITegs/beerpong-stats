import React, { useState } from "react";
import "./Home.css";

import Ranking from "../components/Ranking";
import PlayerCard from "../components/PlayerCard";
import GamesCard from "../components/GamesCard";
import AddPlayerCard from "../components/AddPlayerCard";
import AddGameCard from "../components/AddGameCard";

export default function Home() {
  const [showAddPlayer, setShowAddPlayer] = useState(false);
  const [showAddGame, setShowAddGame] = useState(false);

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
      {showAddGame ? (
        <AddGameCard
          showAddGame={showAddGame}
          setShowAddGame={setShowAddGame}
        />
      ) : (
        <GamesCard showAddGame={showAddGame} setShowAddGame={setShowAddGame} />
      )}
    </div>
  );
}
