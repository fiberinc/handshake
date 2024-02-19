import { DevIndex } from "./DevIndex";

const IS_DEV = process.env.NODE_ENV === "development";

export default function Home() {
  if (IS_DEV) {
    return <DevIndex />;
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
