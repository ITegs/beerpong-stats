import React, { useEffect, useState } from "react";
import "./Ranking.css";

import { getScoreboard } from "../utils/storage";

export default function Ranking() {
  const [scoreboard, setScoreboard] = useState(getScoreboard());

  useEffect(() => {
    setScoreboard(getScoreboard());
  }, [scoreboard]);

  return (
    <div
      className={
        scoreboard.length >= 3 ? "RankingContainer" : "RankingContainer Hide"
      }
    >
      <div className="RankingSecond">
        <b>2</b>
        <p>
          {scoreboard[1]?.name.length < 11
            ? scoreboard[1]?.name
            : scoreboard[1]?.name.substring(0, 10) + "..."}
        </p>
      </div>
      <div className="RankingFirst">
        <b>1</b>
        <p>
          {scoreboard[0]?.name.length < 11
            ? scoreboard[0]?.name
            : scoreboard[0]?.name.substring(0, 10) + "..."}
        </p>
      </div>
      <div className="RankingThird">
        <b>3</b>
        <p>
          {scoreboard[2]?.name.length < 11
            ? scoreboard[2]?.name
            : scoreboard[2]?.name.substring(0, 10) + "..."}
        </p>
      </div>
    </div>
  );
}
