import { Expansion, PrismaClient } from "@prisma/client";
import { languages } from "./data/language";
import { expansions } from "./data/expansions";
import { colors } from "./data/player-colors";
import { coreGoals, europeGoals, oceaniaGoals } from "./data/goals";

const db = new PrismaClient();

async function seed() {
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

  const allGoals = [
    { goals: coreGoals, expansion: "C" },
    { goals: oceaniaGoals, expansion: "OC" },
    { goals: europeGoals, expansion: "EU" }
  ].flatMap(
    ({ goals, expansion }) =>
      goals.map(async (goal) => {
        const expansionObj: Expansion | null = await db.expansion.findFirst({ where: { shorthand: expansion }});
        if (!expansionObj) {
          return Promise.reject("Expansion ID not found");
        }
        return db.goal.create({
          data: {
            ...goal,
            expansion: {
              connect: {
                id: expansionObj.id
              }
            }
          }
        })
      })
  );

  console.log(coreGoals.length + oceaniaGoals.length + europeGoals.length, allGoals.length);

  await Promise.all(
    allGoals
  )
}

seed();
