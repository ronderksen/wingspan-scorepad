import * as React from "react";
import { Form } from "@remix-run/react";
import { PlayerColor } from "@prisma/client";
import {
  ActionFunction,
  Link,
  LoaderFunction,
  redirect,
  useLoaderData,
} from "remix";
import { db } from "../utils/db.server";
import { commitSession, getSession } from "../utils/session.server";

interface Player {
  name: string;
  colorId: string;
}

type LoaderData = {
  playerColors: PlayerColor[];
  players: Player[];
};

interface EggLabelCssProperties extends React.CSSProperties {
  "--color": string;
}

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const players = session.has("players") ? session.get("players") : [];

  const playerColors = await db.playerColor.findMany({
    orderBy: { name: "asc" },
  });

  const data: LoaderData = {
    playerColors,
    players,
  };

  return data;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const session = await getSession(request.headers.get("Cookie"));

  if (!session) {
    return redirect("/new-game");
  }

  const newPlayerName = formData.get("newPlayerName");
  const newPlayerColor = formData.get("newPlayerColor");

  if (typeof newPlayerName !== "string" || typeof newPlayerColor !== "string") {
    throw new Error("Form not submitted correctly.");
  }

  const players: Player[] = session.has("players")
    ? session.get("players")
    : [];
  players.push({
    name: newPlayerName,
    colorId: newPlayerColor,
  });

  session.set("players", players);

  return redirect("/new-game", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

export default function NewGame() {
  const data = useLoaderData<LoaderData>();

  const filterSelectedColors = (currentColor: PlayerColor) =>
    data.players.find(({ colorId }) => currentColor.id === colorId) ===
    undefined;

  return (
    <>
      {data.players.length < 5 && (
        <Form reloadDocument method="post">
          <fieldset>
            <legend>Players</legend>
            <div>
              <label htmlFor="newPlayerName">Player name</label>
              <input type="text" name="newPlayerName" id="newPlayerName" />
            </div>
            <div>
              <label htmlFor="newPlayerColor">Player color</label>
              {data.playerColors.filter(filterSelectedColors).map((color) => {
                const style: EggLabelCssProperties = {
                  "--color": `#${color.color}`,
                };
                return (
                  <div key={color.id}>
                    <input
                      type="radio"
                      name="newPlayerColor"
                      id={`newPlayerColor_${color.id}`}
                      value={color.id}
                    />
                    <label
                      htmlFor={`newPlayerColor_${color.id}`}
                      className="player-color-egg"
                      style={style}
                    >
                      <span className="sr-only">{color.name}</span>
                    </label>
                  </div>
                );
              })}
            </div>
            <button type="submit">Add player</button>
          </fieldset>
        </Form>
      )}
      <ul>
        {data.players.map(({ name, colorId }) => {
          const color = data.playerColors.find((color) => color.id === colorId);
          const style: EggLabelCssProperties = {
            "--color": `#${color?.color}`,
          };

          return (
            <li key={colorId}>
              {name} <span className="player-color-egg" style={style} />{" "}
              <Link reloadDocument to={`/api/delete-player?player=${name}`}>
                remove
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
