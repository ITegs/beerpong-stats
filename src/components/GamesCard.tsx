import React, { useEffect, useState } from "react";
import "./GamesCard.css";
import { getGames, getScoreboard } from "../utils/storage";
import { Team } from "../utils/types";

export default function GamesCard(props: {
  showAddGame: boolean;
  setShowAddGame: Function;
}) {
  const [games, setGames] = useState(getGames());

  useEffect(() => {
    setGames(getGames());
  }, [games]);

  return (
    <div className="GamesCardContainer">
      <div className="GamesCardHead">
        <h1 className="GamesCardTitle">Games</h1>
        <img
          src="./add.svg"
          alt="Add"
          onClick={() => props.setShowAddGame(!props.showAddGame)}
        />
      </div>
      <table className="GamesCardTable">
        {games.map((game, index) => (
          <tr key={index}>
            <td className="GamesCardRed">
              {
                getScoreboard().find((player) => player.id === game.red[0])
                  ?.name
              }
              <br />
              {
                getScoreboard().find((player) => player.id === game.red[1])
                  ?.name
              }
            </td>
            <td className="GamesCardWin">
              {game.winner === Team.RED && <img src="./crown.svg" alt="win" />}
            </td>
            <td className="GamesCardVS">vs</td>
            <td className="GamesCardWin">
              {game.winner === Team.BLUE && <img src="./crown.svg" alt="win" />}
            </td>
            <td className="GamesCardBlue">
              {
                getScoreboard().find((player) => player.id === game.blue[0])
                  ?.name
              }
              <br />
              {
                getScoreboard().find((player) => player.id === game.blue[1])
                  ?.name
              }
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
