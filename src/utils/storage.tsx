import { Game, Player } from "./types";

import { v4 as uuidv4 } from "uuid";

const Scoreboard: Player[] = [
  {
    id: "ba85ca19-aa52-418c-bc95-8e310a29e56c",
    name: "Tom",
    games: 8,
    wins: 8,
  },
  {
    id: "c416c1f4-c58f-4251-86f8-6f5737a3e1a4",
    name: "Yannic",
    games: 1,
    wins: 1,
  },
  {
    id: "11457752-1ff5-4ad0-a77a-68ebc5231bf3",
    name: "Johannes",
    games: 10,
    wins: 6,
  },
  {
    id: "97ae4c1a-7b5d-47e8-9f13-49fe8b6dd7cf",
    name: "Hanne",
    games: 8,
    wins: 8,
  },
];

export const getScoreboard = () => {
  return Scoreboard;
};

export const addPlayer = (name: string) => {
  const newPlayer: Player = {
    id: uuidv4(),
    name: name,
    games: 0,
    wins: 0,
  };
  Scoreboard.push(newPlayer);
  Scoreboard.sort((a, b) => b.wins - a.wins);
  return newPlayer;
};

const Games: Game[] = [
  {
    id: "a0903ee2-248b-4c40-89b1-946821ebcea6",
    red: [
      "11457752-1ff5-4ad0-a77a-68ebc5231bf3",
      "97ae4c1a-7b5d-47e8-9f13-49fe8b6dd7cf",
    ],
    blue: [
      "ba85ca19-aa52-418c-bc95-8e310a29e56c",
      "c416c1f4-c58f-4251-86f8-6f5737a3e1a4",
    ],
    winner: "blue",
  },
  {
    id: "acbdc1a4-811c-47da-9023-4d324fc5a299",
    red: [
      "ba85ca19-aa52-418c-bc95-8e310a29e56c",
      "97ae4c1a-7b5d-47e8-9f13-49fe8b6dd7cf",
    ],
    blue: [
      "c416c1f4-c58f-4251-86f8-6f5737a3e1a4",
      "11457752-1ff5-4ad0-a77a-68ebc5231bf3",
    ],
    winner: "red",
  },
  {
    id: "a0673ee2-248b-4c40-89b1-946821ebaea6",
    red: [
      "c416c1f4-c58f-4251-86f8-6f5737a3e1a4",
      "11457752-1ff5-4ad0-a77a-68ebc5231bf3",
    ],
    blue: [
      "ba85ca19-aa52-418c-bc95-8e310a29e56c",
      "97ae4c1a-7b5d-47e8-9f13-49fe8b6dd7cf",
    ],
    winner: "blue",
  },
  {
    id: "a0903ee2-248b-4c40-89b1-946821ebaea6",
    red: [
      "c416c1f4-c58f-4251-86f8-6f5737a3e1a4",
      "97ae4c1a-7b5d-47e8-9f13-49fe8b6dd7cf",
    ],
    blue: [
      "ba85ca19-aa52-418c-bc95-8e310a29e56c",
      "11457752-1ff5-4ad0-a77a-68ebc5231bf3",
    ],
    winner: "blue",
  },
];

export const getGames = () => {
  return Games;
};

export const addGame = (
  red: string[],
  blue: string[],
  winner: "blue" | "red"
) => {
  const newGame: Game = {
    id: uuidv4(),
    blue: blue,
    red: red,
    winner: winner,
  };
  Games.push(newGame);
  red.forEach((player) => {
    Scoreboard.find((p) => p.id === player)!.games++;
    if (winner === "red") {
      Scoreboard.find((p) => p.id === player)!.wins++;
    }
  });
  blue.forEach((player) => {
    Scoreboard.find((p) => p.id === player)!.games++;
    if (winner === "blue") {
      Scoreboard.find((p) => p.id === player)!.wins++;
    }
  });
  return newGame;
};
