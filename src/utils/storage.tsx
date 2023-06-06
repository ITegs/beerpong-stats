import { Game, Player, Team } from "./types";

import { v4 as uuidv4 } from "uuid";

const Scoreboard: Player[] = [];

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

const Games: Game[] = [];

export const getGames = () => {
  return Games;
};

export const addGame = (red: string[], blue: string[], winner: Team) => {
  const newGame: Game = {
    id: uuidv4(),
    blue: blue,
    red: red,
    winner: winner,
  };
  Games.push(newGame);
  red.forEach((player) => {
    Scoreboard.find((p) => p.id === player)!.games++;
    if (winner === Team.RED) {
      Scoreboard.find((p) => p.id === player)!.wins++;
    }
  });
  blue.forEach((player) => {
    Scoreboard.find((p) => p.id === player)!.games++;
    if (winner === Team.BLUE) {
      Scoreboard.find((p) => p.id === player)!.wins++;
    }
  });
  return newGame;
};
