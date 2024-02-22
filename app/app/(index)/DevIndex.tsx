import { Inter } from "next/font/google";
import { options } from "../api/[...handshake]/route";

const REPO_HOST = "https://github.com/fiberinc/link";
const inter = Inter({ subsets: ["latin"] });

export async function DevIndex() {
  const handlers = await getSanitizedHandlerInfo();

  const els = handlers.map((handler) => {
    const base = `/api/auth/${handler.id}/redirect`;
    let args =
      "state=111&account_id=222&callback_uri=http://localhost:3000/done";

    // Shopify redirection consumes a 'shop' field to identify the shop for its
    // own redirection.
    if (handler.id === "shopify") {
      args += "&extras.shop=hahvaleu.myshopify.com";
    }

    return (
      <li key={handler.id} className="group flex flex-row items-center">
        <a href={`${base}?${args}`} target="blank">
          <span>{base}</span>
          <span className="opacity-10 transition group-hover:opacity-100">
            ?{args}
          </span>
        </a>
      </li>
    );
  });

  let main;
  if (handlers.length) {
    main = (
      <>
        <p>The following projects are configured: (click to start auth)</p>
        <ul>{els}</ul>
      </>
    );
  } else {
    main = (
      <div>
        <h3>Add the following code to your app/api/[...handshake]/route.ts</h3>
        <pre>
          <code>{`
import { Handshake } from "handshake";

const options: HandshakeOptions = {
  // ...
  handlers: [
    Google({
      clientId: "...",
      clientSecret: "...",
    })
  ]
}
`}</code>
        </pre>
      </div>
    );
  }

  return (
    <main
      className={`justify-top flex min-h-screen flex-col items-start p-12 ${inter.className} gap-5`}
    >
      <section>
        <h2 className="text-lg font-semibold">Handshake is running</h2>
        <p>But there is nothing to see in this root page.</p>
      </section>
      <main className="flex flex-col gap-4">{main}</main>
      <p>
        Stuck? Get help{" "}
        <a href={REPO_HOST} target="_blank">
          on our Github
        </a>
        .
      </p>
      <p>This page only appears in development mode.</p>
    </main>
  );
}

async function getSanitizedHandlerInfo() {
  return options.handlers.map((handler) => {
    return {
      id: handler.id,
      providerType: handler.provider.id,
      providerMetadata: handler.provider.metadata,
    };
  });
}
