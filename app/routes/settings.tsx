import * as React from "react";
import { Form } from "@remix-run/react";
import type { ActionFunction, LoaderFunction } from "remix";
import { redirect, useLoaderData } from "remix";
import { Expansion, Language } from "@prisma/client";
import { db } from "../utils/db.server";
import { commitSession, getSession } from "../utils/session.server";

type LoaderData = {
  expansions: Array<Expansion>;
  languages: Array<Language>;
  user: {
    expansions: Array<string>;
    language: string;
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const languages = await db.language.findMany({
    orderBy: { name: "asc" },
  });

  const data: LoaderData = {
    expansions: await db.expansion.findMany(),
    languages,
    user: {
      expansions: session.get("expansions") || [],
      language: session.get("language") || languages[0].id,
    },
  };

  return data;
};

export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  console.log(data.getAll("expansions"));
  const session = await getSession(request.headers.get("Cookie"));
  session.set("language", data.get("language"));
  session.set("expansions", data.getAll("expansions"));

  return redirect("/settings", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

export default function Settings() {
  const data = useLoaderData<LoaderData>();

  return (
    <Form reloadDocument method="post">
      <fieldset>
        <legend>Used expansions</legend>
        {data.expansions.map((expansion) => (
          <div key={expansion.id}>
            <input
              type="checkbox"
              name={"expansions"}
              value={expansion.id}
              id={`expansions_${expansion.id}`}
              defaultChecked={data.user.expansions.includes(expansion.id)}
            />
            <label htmlFor={`expansions_${expansion.id}`}>
              {expansion.name}
            </label>
          </div>
        ))}
      </fieldset>
      <fieldset>
        <legend>Language</legend>
        <div>
          <label htmlFor="language">
            <span className="sr-only">Select language</span>
            <select
              name="language"
              id="language"
              defaultValue={data.user.language}
            >
              <option>[ Select your preferred language ]</option>
              {data.languages.map((language) => (
                <option key={language.id} value={language.id}>
                  {language.name}
                </option>
              ))}
            </select>
          </label>
        </div>
      </fieldset>
      <button type="submit">Save settings</button>
    </Form>
  );
}
