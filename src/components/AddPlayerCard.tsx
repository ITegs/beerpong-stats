import React, { useState } from "react";
import "./AddPlayerCard.css";

import { addPlayer } from "../utils/storage";

export default function AddPlayerCard(props: {
  showAddPlayer: boolean;
  setShowAddPlayer: Function;
}) {
  const [name, setName] = useState("");
  return (
    <div className="AddPlayerCardContainer">
      <h1 className="AddPlayerCardTitle">Add Player</h1>
      <input
        className="AddPlayerCardInput"
        type="text"
        placeholder="Name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <div className="AddPlayerCardButtons">
        <p
          className="AddPlayerCardButton"
          onClick={() => props.setShowAddPlayer(!props.showAddPlayer)}
        >
          Cancel
        </p>
        <p
          className="AddPlayerCardButton AddButton"
          onClick={() => {
            if (name) addPlayer(name);
            props.setShowAddPlayer(!props.showAddPlayer);
          }}
        >
          Add
        </p>
      </div>
    </div>
  );
}
