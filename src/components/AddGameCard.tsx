import React, { useState } from "react";
import "./AddGameCard.css";

import { addGame, getScoreboard } from "../utils/storage";
import { Team } from "../utils/types";

export default function AddGameCard(props: {
  showAddGame: boolean;
  setShowAddGame: Function;
}) {
  const [red, setRed] = useState<string[]>([]);
  const [blue, setBlue] = useState<string[]>([]);
  const [winner, setWinner] = useState<Team>();

  return (
    <div className="AddGameCardContainer">
      <h1 className="AddGameCardTitle">Add Game</h1>
      <div className="AddGameRed">
        <select
          className="AddGameCardSelectRed"
          multiple
          onChange={(e) => {
            const selected = Array.from(
              e.target.selectedOptions,
              (option) => option.value
            );
            setRed(selected);
          }}
        >
          {getScoreboard().map((player) => (
            <option value={player.id}>{player.name}</option>
          ))}
        </select>
        <img
          src="./crown.svg"
          alt="redwin"
          className={winner === Team.RED ? "RedWin" : "RedWinDisabled"}
          onClick={() => setWinner(Team.RED)}
        />
      </div>
      <p className="AddGameCardVS">VS</p>
      <div className="AddGameBlue">
        <select
          className="AddGameCardSelectBlue"
          multiple
          onChange={(e) => {
            const selected = Array.from(
              e.target.selectedOptions,
              (option) => option.value
            );
            setBlue(selected);
          }}
        >
          {getScoreboard().map((player) => (
            <option value={player.id}>{player.name}</option>
          ))}
        </select>
        <img
          src="./crown.svg"
          alt="bluewin"
          className={winner === Team.BLUE ? "BlueWin" : "BlueWinDisabled"}
          onClick={() => setWinner(Team.BLUE)}
        />
      </div>

      <div className="AddGameCardButtons">
        <p
          className="AddGameCardButton"
          onClick={() => props.setShowAddGame(!props.showAddGame)}
        >
          Cancel
        </p>
        <p
          className="AddGameCardButton AddButton"
          onClick={() => {
            if (winner) {
              addGame(red, blue, winner);
              props.setShowAddGame(!props.showAddGame);
            }
          }}
        >
          Add
        </p>
      </div>
    </div>
  );
}
