import { Goal } from "@prisma/client";

export const coreGoals: Omit<Goal, "id" | "expansionId">[] = [
  { name: "birds in forest habitat", imgFileName: "" },
  { name: "birds in grassland habitat", imgFileName: "" },
  { name: "birds in wetland habitat", imgFileName: "" },
  { name: "eggs in forest habitat", imgFileName: "" },
  { name: "eggs in grassland habitat", imgFileName: "" },
  { name: "eggs in wetland habitat", imgFileName: "" },
  { name: "sets of eggs in habitats", imgFileName: "" },
  { name: "birds with platform nest type", imgFileName: "" },
  { name: "birds with bowl nest type", imgFileName: "" },
  { name: "birds with cavity nest type", imgFileName: "" },
  { name: "birds with ground nest type", imgFileName: "" },
  { name: "eggs in platform nest type", imgFileName: "" },
  { name: "eggs in bowl nest type", imgFileName: "" },
  { name: "eggs in cavity nest type", imgFileName: "" },
  { name: "eggs in ground nest type", imgFileName: "" },
  { name: "total number of birds", imgFileName: "" }
];

export const oceaniaGoals: Omit<Goal, "id" | "expansionId">[] = [
  { name: "no goal", imgFileName: "" },
  { name: "beak pointing left", imgFileName: "" },
  { name: "beak pointing right", imgFileName: "" },
  { name: "cubes on 'play a bird'", imgFileName: "" },
  { name: "food cost of your birds: worms", imgFileName: "" },
  { name: "food cost of your birds: berries + wheat", imgFileName: "" },
  { name: "food cost of your birds: mice + fish", imgFileName: "" },
  { name: "bird cards worth less than 3 points", imgFileName: "" }
];

export const europeGoals: Omit<Goal, "id" | "expansionId">[] = [
  { name: "bird cards worth more than 4 points", imgFileName: "" },
  { name: "birds in one row", imgFileName: "" },
  { name: "food tokens in personal supply", imgFileName: "" },
  { name: "birds with tucked cards", imgFileName: "" },
  { name: "birds with brown powers", imgFileName: "" },
  { name: "bird cards in hand", imgFileName: "" },
  { name: "birds with no eggs", imgFileName: "" },
  { name: "filled columns", imgFileName: "" },
  { name: "white and no powers", imgFileName: "" },
  { name: "food cost of played birds", imgFileName: "" }
];
