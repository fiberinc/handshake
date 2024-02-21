import { Metadata } from "next";
import Link from "next/link";
import { Banner } from "~/ui/Banner";
import { GithubLogoMark } from "~/ui/GithubLogoMark";
import { getProviderInfos } from "../getProviderInfos";
import { REPO_URL } from "../routes";

export const metadata: Metadata = {
  title: "Handshake – OAuth made easy",
};

export default function Home() {
  return (
    <div className="m-auto flex flex-col gap-16">
      <header className="flex flex-col gap-3">
        <Link href="/providers/#stripe">
          <Banner>🎉 New Stripe connector</Banner>
        </Link>
        <h1
          className="text-contrast text-[305px] font-semibold leading-[1.1] lg:text-[85px]"
          style={{
            // @ts-ignore
            textWrap: "balance",
          }}
        >
          Get third-party access tokens for 60+ APIs
        </h1>
        <p className="text-contrast max-w-[760px] text-2xl antialiased">
          Handshake handles the OAuth flow with popular APIs gives you
          credentials to access user accounts in third-party services.
        </p>
        <br />
        <section className="flex flex-wrap gap-5">
          <a
            href={REPO_URL}
            className="flex h-[55px] flex-row items-center gap-3 rounded-md border bg-white p-4 px-5 font-medium text-black "
          >
            <GithubLogoMark size={25} /> Github
          </a>

          <a
            href="https://github.com/fiberinc/handshake?tab=readme-ov-file#deploy"
            className="flex h-[55px] flex-row items-center gap-3 rounded-md bg-black p-4 px-5 font-medium text-white antialiased"
          >
            <span className="text-[20px] leading-[0.5]">▲</span>
            &nbsp;&nbsp;Deploy to Vercel
          </a>
        </section>
      </header>
      <div className="flex w-full flex-col gap-16">
        <section className="flex flex-col gap-5">
          <div>
            <h2 className="text-subheader text-contrast mb-5">
              Getting started
            </h2>
            <p>
              Clone our repo to get started.{" "}
              <a href={REPO_URL} className="hover:text-link">
                Then follow the instructions in our README.
              </a>
            </p>
          </div>

          <code className="bg-foreground text-contrast block rounded-md p-5 antialiased">
            <pre>
              <span className="text-default/60 mr-3">{`$`}</span> git clone
              https://github.com/fiberinc/handshake.git
            </pre>
          </code>
        </section>
        <section className="flex flex-col gap-5">
          <div>
            <h2 className="text-subheader text-contrast mb-3">
              Supported Providers
            </h2>
            <p>Click to see documentation.</p>
          </div>
          <ul className="flex flex-row flex-wrap gap-2">
            <ProviderNames />
          </ul>
          <p>
            Can&apos;t find a provider? Let us know by{" "}
            <a
              href={REPO_URL + "/issues"}
              target="_blank"
              className="hover:text-link underline underline-offset-2"
            >
              opening an issue.
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}

async function ProviderNames() {
  const infos = await getProviderInfos();
  const els = infos.map((info) => (
    <Link key={info.id} href={`/providers#${info.id}`}>
      <div className="hover:bg-foreground text-contrast rounded-md border px-3 py-2">
        {info.name}
      </div>
    </Link>
  ));
  return <>{els}</>;
}
