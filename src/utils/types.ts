export type Player = {
  id: string;
  name: string;
  games: number;
  wins: number;
};

export type Game = {
  id: string;
  blue: [Player, Player];
  red: [Player, Player];
  winner: "blue" | "red";
};
