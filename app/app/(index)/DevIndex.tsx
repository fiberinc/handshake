import { Inter } from "next/font/google";
import { config } from "~/config";

const REPO_HOST = "https://github.com/fiberinc/link";
const inter = Inter({ subsets: ["latin"] });

export async function DevIndex() {
  const providers = await getSanitizedProviderConfigs();

  const els = providers.map((provider) => {
    const base = `/api/auth/${provider.id}/redirect`;
    let args =
      "state=111&account_id=222&callback_uri=http://localhost:3000/done";

    if (provider.id === "shopify") {
      args += "&extras.shop=hahvaleu.myshopify.com";
    }

    return (
      <li key={provider.id} className="group flex flex-row items-center">
        <a href={`${base}?${args}`} target="blank">
          <span>{base}</span>
          <span className="opacity-10 transition group-hover:opacity-100">
            ?{args}
          </span>
        </a>
      </li>
    );
  });

  return (
    <main
      className={`justify-top flex min-h-screen flex-col items-start p-12 ${inter.className} gap-5`}
    >
      <section>
        <h2 className="text-lg font-semibold">Handshake is running</h2>
        <p>But this root page has nothing to do.</p>
      </section>
      <section>
        <p>Try navigating to:</p>
        <ul>{els}</ul>
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

async function getSanitizedProviderConfigs() {
  return config.providers.map((provider) => {
    return {
      id: provider.id,
      metadata: provider.metadata,
      type: provider.type,
    };
  });
}
