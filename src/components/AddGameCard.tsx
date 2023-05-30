import React, { useState } from "react";
import "./AddGameCard.css";

import { addGame, getScoreboard } from "../utils/storage";

export default function AddGameCard(props: {
  showAddGame: boolean;
  setShowAddGame: Function;
}) {
  const [red, setRed] = useState<string[]>([]);
  const [blue, setBlue] = useState<string[]>([]);

  return (
    <div className="AddGameCardContainer">
      <h1 className="AddGameCardTitle">Add Game</h1>
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
      <p className="AddGameCardVS">VS</p>
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
            addGame(red, blue, "red");
            props.setShowAddGame(!props.showAddGame);
          }}
        >
          Add
        </p>
      </div>
    </div>
  );
}
