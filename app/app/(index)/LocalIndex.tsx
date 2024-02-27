import { twMerge } from "tailwind-merge";
import { options } from "~/options";

const REPO_URL = "https://github.com/fiberinc/handshake";

export async function LocalIndex() {
  const handlers = await getSanitizedHandlerInfo();

  const els = handlers.map((handler) => {
    const base = `/api/auth/${handler.id}/redirect`;
    let args = "state=1234567890&callback_uri=http://localhost:3000/success";

    // Shopify redirection consumes a 'shop' field to identify the shop for its
    // own redirection.
    if (handler.id === "shopify") {
      args += "&extras.shop=hahvaleu.myshopify.com";
    }

    return (
      <li key={handler.id} className="flex flex-col gap-3 bg-gray-50 p-5">
        <p className="flex flex-row items-center gap-3">
          <img
            className="inline-block"
            src={handler.provider.logo}
            width={18}
            alt=""
          />
          <strong className="font-medium">{handler.provider.title}</strong>{" "}
          <span
            className={twMerge(
              "italic",
              handler.id === handler.provider.id && "opacity-30",
            )}
          >
            id: {handler.id}
          </span>
        </p>
        <p className="group text-sm">
          Example redirection URL:{" "}
          <a href={`${base}?${args}`} target="blank">
            <span>{base}</span>
            <span className="opacity-10 transition group-hover:opacity-100">
              ?{args}
            </span>
          </a>
        </p>
      </li>
    );
  });

  let main;
  if (handlers.length) {
    main = (
      <>
        <p>The following handlers are configured:</p>
        <ul className="flex flex-col gap-5">{els}</ul>
      </>
    );
  } else {
    main = (
      <div className="flex flex-col gap-3">
        <h2 className="font-semibold">No providers are configured</h2>
        <h3 className="mb-3">
          Add the following code to your <code>app/options.ts</code>
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
      className={`justify-top flex min-h-screen flex-col items-start gap-8 p-12`}
    >
      <section>
        <h2 className="text-lg font-semibold">Handshake is running</h2>
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
  return options.handlers.map((handler) => {
    return {
      id: handler.id,
      provider: {
        id: handler.provider.id,
        title: handler.provider.name,
        logo: `https://handshake.cool/images/logos/${handler.provider.id}.svg`,
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
