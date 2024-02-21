import { DevIndex } from "./DevIndex";

const IS_DEV = process.env.NODE_ENV === "development";

export default function Home() {
  if (IS_DEV) {
    return <DevIndex />;
  }

  return (
    <main>
      <p>Your OAuth redirection is now up.</p>
    </main>
  );
}
