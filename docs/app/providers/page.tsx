import { Metadata } from "next";
import { ProviderList } from "./ProviderList";

export const metadata: Metadata = {
  title: "Handshake Providers",
};

export default function Page() {
  return (
    <div className="m-auto flex flex-col gap-16">
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
