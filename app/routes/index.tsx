import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, json, Link } from "remix";

type IndexData = {
  resources: Array<{ name: string; url: string }>;
  demos: Array<{ name: string; to: string }>;
};

export let loader: LoaderFunction = () => {
  return null;
};

export let meta: MetaFunction = () => {
  return {
    title: "Wingspan scorepad",
    description: "Use the Wingspan scorepad to select your end of round goals, and calculate your scores at the end of the game!"
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  let data = useLoaderData<IndexData>();

  return (
    <section>
      <p>Welcome to the Wingspan scorepad app. Choose an option to get started:</p>
      <ul>
        <li><Link to={"/new-game"}>Create game</Link></li>
        <li><Link to={"/continue-game"} aria-disabled>Continue game</Link></li>
        <li><Link to={"/settings"}>Settings</Link></li>
      </ul>
    </section>
  );
}
