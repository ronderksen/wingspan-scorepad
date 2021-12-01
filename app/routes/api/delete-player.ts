import { LoaderFunction, redirect } from "remix";
import { commitSession, getSession } from "../../utils/session.server";

interface Player {
  name: string;
  colorId: string;
}

export const loader: LoaderFunction = async ({ params, request }) => {
  const url = new URL(request.url);
  const session = await getSession(request.headers.get("Cookie"));
  const players: Player[] = session.get("players");
  const playerName = url.searchParams.get("player");

  if (!playerName) {
    return new Response(null, { status: 404 });
  }

  const updatedPlayers = players.filter((player) => player.name !== playerName);
  session.set("players", updatedPlayers);

  return redirect("/new-game", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};
