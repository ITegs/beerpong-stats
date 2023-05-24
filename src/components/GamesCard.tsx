import React, { useState } from "react";
import "./GamesCard.css";
import { getGames } from "../utils/storage";

export default function GamesCard() {
  const [games, setGames] = useState(getGames());

  return (
    <div className="GamesCardContainer">
      <div className="GamesCardHead">
        <h1 className="GamesCardTitle">Games</h1>
        <img src="/add.svg" alt="Add" />
      </div>
      <table className="GamesCardTable">
        {games.map((game, index) => (
          <tr key={index}>
            <td className="GamesCardRed">
              {game.red[0].name} <br /> {game.red[1].name}
            </td>
            <td className="GamesCardWin">
              {game.winner === "red" && <img src="/crown.svg" alt="win" />}
            </td>
            <td className="GamesCardVS">vs</td>
            <td className="GamesCardWin">
              {game.winner === "blue" && <img src="/crown.svg" alt="win" />}
            </td>
            <td className="GamesCardBlue">
              {game.blue[0].name} <br /> {game.blue[1].name}
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
