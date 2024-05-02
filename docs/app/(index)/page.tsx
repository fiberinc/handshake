import { Metadata } from "next";
import Link from "next/link";
import { BiBookAlt } from "react-icons/bi";
import { FaExternalLinkAlt } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import { Banner } from "~/ui/Banner";
import { GithubLogoMark } from "~/ui/GithubLogoMark";
import { getGuides } from "../__guides/[slug]/loaders";
import { getProviderInfos } from "../getProviderInfos";
import { REPO_URL } from "../routes";
import { GitCloneCopyButton } from "./GitCloneCopyButton";
import { ProviderGrid } from "./ProviderGrid";
import { WistiaPlayer } from "./WistiaPlayer";

export const metadata: Metadata = {
  title: "Handshake – OAuth made easy",
};

const BUTTON_CLS = "flex h-[55px] flex-row items-center gap-3 font-medium";

export default async function Page() {
  const infos = await getProviderInfos();

  return (
    <div className="m-auto flex flex-col gap-16 ">
      <header className="flex flex-col gap-3">
        <Link href="/providers/#stripe" className="w-fit">
          <Banner>
            <span className="mr-2">🎉</span>New Faire provider
            <span className="text-default ml-2 opacity-60">&rarr;</span>&nbsp;
          </Banner>
        </Link>
        <h1
          className="text-contrast text-[35px] font-semibold leading-[1.1] lg:text-[85px]"
          style={{
            // @ts-ignore
            textWrap: "balance",
          }}
        >
          Get access tokens for 200+ services
        </h1>
        <p className="text-contrast text-md mb-4 max-w-[760px] antialiased md:text-2xl">
          {/* Handshake is an OAuth handler that gets you access tokens to your
          users&apos; accounts in dozens of popular apps and APIs */}
          Handshake handles OAuth flows with popular tools and gets you access
          tokens to your users&apos; third-party accounts.
        </p>
        <section className="flex flex-wrap gap-5">
          <a
            href={REPO_URL}
            className={twMerge(
              BUTTON_CLS,
              "rounded-md border bg-white px-5 text-black ",
            )}
          >
            <GithubLogoMark size={25} /> Star on Github
          </a>

          <a
            href="https://github.com/fiberinc/handshake?tab=readme-ov-file#deploy"
            className={twMerge(
              BUTTON_CLS,
              "gap-2 rounded-md border bg-black px-5 pl-3 text-white antialiased",
            )}
          >
            <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#222] text-[20px] leading-[0.5]">
              ▲
            </span>
            &nbsp;&nbsp;Deploy to Vercel
          </a>
        </section>
      </header>
      <div className="flex w-full flex-col gap-16">
        <section className="flex flex-col gap-5">
          <div>
            <h2 className="text-subheader text-contrast mb-3">Demo</h2>
            <p>See Handshake in action handling a Github OAuth flow:</p>
          </div>
          <WistiaPlayer />
        </section>
        <section className="flex flex-col gap-5">
          <div>
            <h2 className="text-subheader text-contrast mb-3">
              Getting started
            </h2>
            <p>Clone our repo to get started. </p>
          </div>

          <div className="bg-foreground text-contrast flex flex-col gap-4 rounded-md p-5">
            <code className="flex h-[30px] flex-row items-center justify-between overflow-hidden">
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
            <ProviderGrid infos={infos} />
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
                "text-contrast hover:border-stronger inline-flex rounded-md border bg-white p-10 text-lg transition md:text-[40px] dark:bg-black",
              )}
            >
              <FaExternalLinkAlt className="mr-3 w-8" />
              README.md
            </a>
          </div>
        </section>
        <div className="mt-5 w-full border-t " />
        {/* <section className="flex hidden flex-col gap-6">
          <div>
            <h2 className="text-subheader text-contrast mb-3">Guides</h2>
          </div>
          <LatestGuides />
        </section> */}
      </div>
    </div>
  );
}

async function LatestGuides() {
  const guides = await getGuides();

  return (
    <ul className="flex list-none flex-col gap-4">
      {guides.map((guide) => {
        return (
          <li key={guide.slug}>
            <Link href={`/guides/${guide.slug}`}>
              <div className="text-contrast hover:border-stronger flex h-[50px] w-full flex-row items-center justify-between rounded-md border px-4 transition">
                <h2 className="text-contrast text-md">{guide.title}</h2>
                <div>
                  <BiBookAlt className="w-5" />
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
