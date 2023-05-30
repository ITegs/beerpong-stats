export type Player = {
  id: string;
  name: string;
  games: number;
  wins: number;
};

export type Game = {
  id: string;
  red: string[];
  blue: string[];
  winner: "blue" | "red";
};
