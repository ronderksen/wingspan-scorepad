import { PrismaClient } from "@prisma/client";
import type { Expansion, Language, PlayerColor } from "@prisma/client";

const db = new PrismaClient();

async function seed() {
  const expansions: Omit<Expansion, "id">[] = [
    { name: "Europe", shorthand: "EU" },
    { name: "Oceania", shorthand: "OC" },
  ];
  const languages: Omit<Language, "id">[] = [
    { name: "English", code: "en" },
    { name: "Nederlands", code: "nl" },
  ];
  const colors: Omit<PlayerColor, "id">[] = [
    { name: "red", color: "e01c51" },
    { name: "blue", color: "7ec6e1" },
    { name: "green", color: "d2e4a9" },
    { name: "yellow", color: "fede73" },
    { name: "purple", color: "b162c8" },
  ];

  await Promise.all(
    languages.map((language) => {
      return db.language.create({ data: language });
    })
  );
  await Promise.all(
    expansions.map((expansion) => db.expansion.create({ data: expansion }))
  );

  await Promise.all(
    colors.map((color) => {
      return db.playerColor.create({ data: color });
    })
  );
}

seed();
