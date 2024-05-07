import { twMerge } from "tailwind-merge";
import { options } from "~/options";

const REPO_URL = "https://github.com/fiberinc/handshake";

export async function LocalIndex() {
  const handlers = await getSanitizedHandlerInfo();

  const els = handlers.map((handler) => {
    const base = `/auth/${handler.id}/redirect`;
    let args = "state=12345&callback_uri=http://localhost:3000/done";

    // Shopify redirection consumes a 'shop' field to identify the shop for its
    // own redirection.
    if (handler.id === "shopify") {
      args += "&extras.shop=example.myshopify.com";
    }

    return (
      <li
        key={handler.id}
        className="relative flex w-full flex-col gap-5 rounded-lg border bg-gray-50 p-5"
      >
        <p className="flex flex-row items-center gap-2">
          <img
            className="inline-block"
            src={handler.provider.logo}
            width={20}
            alt=""
          />
          <strong className="font-medium">{handler.provider.title}</strong>{" "}
        </p>
        <div
          className={twMerge(
            "absolute right-5 top-4",
            "font-mono text-sm [word-spacing:-5px]",
            handler.id === handler.provider.id && "opacity-30",
          )}
        >
          id: {handler.id}
        </div>
        <div className="">
          <p>Send users to:</p>
          <code className="text-sm">
            <a href={`${base}?${args}`} target="blank" className="group">
              <div>
                <div>https://YOUR_HANDSHAKE_INSTANCE{base}</div>

                <div className="ml-6 block w-fit opacity-70 transition group-hover:opacity-100">
                  {args.split("&").map((arg, index) => (
                    <div key={index}>
                      {index > 0 ? "&" : "?"}
                      {arg}
                    </div>
                  ))}
                </div>
              </div>
            </a>
          </code>
        </div>
        <p>
          Authorize this callback URL in the Notion console:
          <br />
          <code className="text-sm">
            https://YOUR_HANDSHAKE_INSTANCE/auth/{handler.id}/callback
          </code>
        </p>
      </li>
    );
  });

  let main;
  if (handlers.length) {
    main = (
      <>
        <p>The following handlers are configured:</p>
        <ul className="flex w-full flex-col gap-5">{els}</ul>
      </>
    );
  } else {
    main = (
      <div className="flex flex-col gap-3 ">
        <h2 className="font-semibold">No providers are configured</h2>
        <h3 className="mb-3">
          Add the following code to your <code>app/options.ts</code>
        </h3>
        <pre className="block rounded-md border p-3 text-sm md:min-w-[600px]">
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
      className={`justify-top flex min-h-screen w-full flex-col items-start gap-8 p-8`}
    >
      <section>
        <h2 className="text-lg font-semibold">Handshake is running</h2>
      </section>
      <main className="flex w-[800px] max-w-full flex-col gap-4">{main}</main>
      <p>
        Stuck? Get help{" "}
        <a href={REPO_URL} target="_blank">
          on our Github
        </a>
        .
      </p>
      {/* <p className="text-default">
        This page only appears in development mode.
      </p> */}
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
