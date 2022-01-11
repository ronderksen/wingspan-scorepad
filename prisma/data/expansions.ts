import { Expansion } from "@prisma/client";

export const expansions: Omit<Expansion, "id">[] = [
  { name: "Core", shorthand: "C" },
  { name: "Europe", shorthand: "EU" },
  { name: "Oceania", shorthand: "OC" },
];
