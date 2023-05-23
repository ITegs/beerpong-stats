import React, { useState } from "react";
import "./Ranking.css";

import { Scoreboard } from "../utils/storage";

export default function Ranking() {
  const [scoreboard, setScoreboard] = useState(Scoreboard);
  useState(() => {
    setScoreboard(
      Scoreboard.sort((a, b) => {
        return b.score - a.score;
      })
    );
  });

  return (
    <div className="RankingContainer">
      <div className="RankingSecond">
        <b>2</b>
        <p>{scoreboard[1].name}</p>
      </div>
      <div className="RankingFirst">
        <b>1</b>
        <p>{scoreboard[0].name}</p>
      </div>
      <div className="RankingThird">
        <b>3</b>
        <p>{scoreboard[2].name}</p>
      </div>
    </div>
  );
}
