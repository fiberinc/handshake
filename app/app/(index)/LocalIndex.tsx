import { config } from "../api/[...handshake]/route";

const REPO_URL = "https://github.com/fiberinc/handshake";

export async function LocalIndex() {
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
      <div className="flex flex-col gap-3">
        <h2 className="font-semibold">No providers are configured</h2>
        <h3 className="mb-3">
          Add the following code to your{" "}
          <code>app/api/[...handshake]/route.ts</code>
        </h3>
        <pre className="block rounded-md border p-3 text-sm">
          <code>{MARKDOWN_CODE}</code>
        </pre>
        <p>
          Follow instructions in{" "}
          <a href={REPO_URL + "/blob/main/README.md"} target="_blank">
            our README.md
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <main
      className={`justify-top flex min-h-screen flex-col items-start gap-5 p-12`}
    >
      <section>
        <h2 className="text-lg font-semibold">Handshake is running</h2>
        <p>But there is nothing to see in this root page.</p>
      </section>
      <main className="flex flex-col gap-4">{main}</main>
      <p>
        Stuck? Get help{" "}
        <a href={REPO_URL} target="_blank">
          on our Github
        </a>
        .
      </p>
      <p>This page only appears in development mode.</p>
    </main>
  );
}

export interface HandlerInfo {
  id: string;
  provider: {
    id: string;
    title: string;
    logo?: string;
  };
}

export async function getSanitizedHandlerInfo(): Promise<HandlerInfo[]> {
  return config.handlers.map((handler) => {
    return {
      id: handler.id,
      provider: {
        id: handler.provider.id,
        title: handler.provider.metadata.title,
        logo: handler.provider.metadata.logo,
      },
    };
  });
}

const MARKDOWN_CODE = `import { Handshake } from "handshake";

const options: HandshakeOptions = {
  // ...
  handlers: [
    // Or whatever service you want to use.
    Google({
      clientId: "...",
      clientSecret: "...",
    })
  ]
}

// ...
`;
