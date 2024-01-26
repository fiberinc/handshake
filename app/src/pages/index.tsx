import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const IS_DEV = process.env.NODE_ENV === "development";

const REPO_HOST = "https://github.com/fiberinc/link";

export default function Home() {
  if (IS_DEV) {
    return (
      <main
        className={`justify-top flex min-h-screen flex-col items-start p-24 ${inter.className} gap-5`}
      >
        <section>
          <h2 className="text-lg font-semibold">Link is running</h2>
          <p>But this root page has nothing to do.</p>
        </section>
        <section>
          <p>Try navigating to: </p>
          <ul>
            <li>
              <a href="/api/auth/amazon-seller/redirect" target="blank">
                /api/foo/amazon-seller/redirect
              </a>
            </li>
            <li>
              <a href="/api/auth/google/redirect" target="blank">
                /api/foo/google/redirect
              </a>
            </li>
          </ul>
        </section>
        <p>
          Stuck? Get help{" "}
          <a href={REPO_HOST} target="_blank">
            on our Github
          </a>
          .
        </p>
      </main>
    );
  }

  // TODO: decide how to handle this.
  return (
    <main>
      <h1>Success</h1>
      <p>Your OAuth redirection is now up.</p>
      <p>To hide this message, ...!?</p>
    </main>
  );
}
