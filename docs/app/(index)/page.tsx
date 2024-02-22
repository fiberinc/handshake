import { Metadata } from "next";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import { Banner } from "~/ui/Banner";
import { GithubLogoMark } from "~/ui/GithubLogoMark";
import { getProviderInfos } from "../getProviderInfos";
import { REPO_URL } from "../routes";
import { GitCloneCopyButton } from "./GitCloneCopyButton";

export const metadata: Metadata = {
  title: "Handshake – OAuth made easy",
};

const BUTTON_CLS = "flex h-[55px] flex-row items-center gap-3 font-medium";

export default function Home() {
  return (
    <div className="m-auto flex flex-col gap-16">
      <header className="flex flex-col gap-3">
        <Link href="/providers/#stripe">
          <Banner>🎉&nbsp;&nbsp;New Stripe connector</Banner>
        </Link>
        <h1
          className="text-contrast text-[305px] font-semibold leading-[1.1] lg:text-[85px]"
          style={{
            // @ts-ignore
            textWrap: "balance",
          }}
        >
          Get user credentials to 60+ tools
        </h1>
        <p className="text-contrast max-w-[760px] text-2xl antialiased">
          Handshake handles OAuth flows with popular tools to give you access
          tokens to your users&apos; third-party accounts.
        </p>
        <br />
        <section className="flex flex-wrap gap-5">
          <a
            href={REPO_URL}
            className={twMerge(
              BUTTON_CLS,
              "rounded-md border bg-white px-5 text-black ",
            )}
          >
            <GithubLogoMark size={25} /> Github
          </a>

          <a
            href="https://github.com/fiberinc/handshake?tab=readme-ov-file#deploy"
            className={twMerge(
              BUTTON_CLS,
              "gap-2 rounded-md border bg-black px-5 pl-3 text-white antialiased",
            )}
          >
            <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#222222] text-[20px] leading-[0.5]">
              ▲
            </span>
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
            <p>Clone our repo to get started. </p>
          </div>

          <div className="bg-foreground text-contrast flex flex-col gap-4 rounded-md p-5">
            <code className="flex h-[30px] flex-row items-center justify-between">
              <pre className="antialiased">
                <span className="text-default/60 mr-3">{`$`}</span> git clone
                https://github.com/fiberinc/handshake.git
              </pre>
              <div className="">
                <GitCloneCopyButton content={`git clone ${REPO_URL}`} />
              </div>
            </code>
          </div>
          <p>
            Then follow the instructions in{" "}
            <a href={REPO_URL} className="hover:text-link">
              our README.
            </a>
          </p>
        </section>
        <section className="flex flex-col gap-6">
          <div>
            <h2 className="text-subheader text-contrast mb-3">
              Supported Providers
            </h2>
            <p>Click to read documentation:</p>
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
        <div className="mt-5 w-full border-t " />
        <section className=" flex flex-col items-center justify-center">
          <div className="text-contrast flex flex-row items-center gap-7 text-[40px]">
            <a
              target="_blank"
              href={REPO_URL + "/blob/main/README.md"}
              className={twMerge(
                BUTTON_CLS,
                "text-contrast hover:border-stronger inline-flex rounded-md border bg-white p-10 text-[40px] transition dark:bg-black",
              )}
            >
              <FaExternalLinkAlt className="mr-3 w-8" />
              README.md
            </a>
          </div>
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
