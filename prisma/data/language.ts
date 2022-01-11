import { Language } from "@prisma/client";

export const languages: Omit<Language, "id">[] = [
  { name: "English", code: "en" },
  { name: "Nederlands", code: "nl" },
];
