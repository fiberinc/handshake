import { LocalIndex } from "./LocalIndex";

const IS_DEV = process.env.NODE_ENV === "development";

export default async function Home() {
  if (IS_DEV) {
    return <LocalIndex />;
  }

  return (
    <main className="p-5">
      {/* TODO: come up with a better message in production this. */}
      <p>Nothing to see here.</p>
    </main>
  );
}
