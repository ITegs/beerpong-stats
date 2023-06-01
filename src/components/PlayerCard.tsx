import React, { useEffect, useState } from "react";
import "./PlayerCard.css";

import { getScoreboard } from "../utils/storage";
import { Player } from "../utils/types";

export default function PlayerCard(props: {
  showAddPlayer: boolean;
  setShowAddPlayer: Function;
}) {
  const [sb, setSb] = useState<Player[]>([]);
  useEffect(() => {
    const temp = getScoreboard();
    temp.sort((a, b) => b.games - a.games);
    setSb(temp);
  }, []);

  return (
    <div className="PlayerCardContainer">
      <div className="PlayerCardHead">
        <h1 className="PlayerCardTitle">Player</h1>
        <img
          src="./add.svg"
          alt="Add"
          onClick={() => props.setShowAddPlayer(!props.showAddPlayer)}
        />
      </div>
      <table className="PlayerCardTable">
        <tr>
          <th className="PlayerCardName">Name</th>
          <th className="PlayerCardGames">Games</th>
          <th className="PlayerCardWins">Wins</th>
          <th className="PlayerCardRatio">Ratio</th>
        </tr>
        {sb.map((player: Player, index: number) => (
          <tr key={index}>
            <td className="PlayerCardName">
              {player.name.length < 11
                ? player.name
                : player.name.substring(0, 10) + "..."}
            </td>
            <td className="PlayerCardGames">{player.games}</td>
            <td className="PlayerCardWins">{player.wins}</td>
            <td className="PlayerCardRatio">
              {player.wins > 0
                ? Math.round((player.wins / player.games) * 100) + "%"
                : "0%"}
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
