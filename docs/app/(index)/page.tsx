import { ProviderList } from "./ProviderList";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 p-16">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold">Handshake</h1>
        <p>
          Handshake is a Next.js app that handles OAuth flow against 60+
          third-party apps and APIs. We use parts of next-auth under the hood to
          extend our coverage of providers.
        </p>
      </header>
      <main>
        <h1 id="providers" className="mb-10 text-2xl">
          Providers
        </h1>

        <ul className="flex flex-col gap-16">
          <ProviderList />
        </ul>
      </main>
    </div>
  );
}
