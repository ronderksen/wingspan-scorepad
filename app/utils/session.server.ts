import { createFileSessionStorage } from "remix";

const { getSession, commitSession, destroySession } = createFileSessionStorage({
  cookie: {
    name: "_wingspan_session",
    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    secrets: ["mysupersecretkey"],
  },
  dir: "./sessions",
});

export { getSession, commitSession, destroySession };
