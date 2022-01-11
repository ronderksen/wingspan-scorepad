import { PlayerColor } from "@prisma/client";

export const colors: Omit<PlayerColor, "id">[] = [
  { name: "red", color: "e01c51" },
  { name: "blue", color: "7ec6e1" },
  { name: "green", color: "d2e4a9" },
  { name: "yellow", color: "fede73" },
  { name: "purple", color: "b162c8" },
];
