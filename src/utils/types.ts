export type Player = {
  id: string;
  name: string;
  games: number;
  wins: number;
};

export type Game = {
  id: string;
  red: [Player, Player];
  blue: [Player, Player];
  winner: "blue" | "red";
};
