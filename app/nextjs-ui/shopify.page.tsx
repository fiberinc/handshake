// @ts-nocheck

import { Tooltip } from "@/components/Tooltip";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useLocalStorage } from "react-use";
import { twMerge } from "tailwind-merge";
import { ProjectInfo } from "../../handshake/src/types";
import {
  Props,
  getServerSideProps,
} from "../nextjs/src/pages/[project]/[provider].page";
import { LinkPage } from "../nextjs/src/pages/[project]/lib/LinkPage";
import { startProviderAuthFlow } from "../nextjs/src/pages/[project]/lib/startFlow";

export default function Page({ projectInfo, providerInfo }: Props) {
  const [domain, setDomain] = useLocalStorage("last-myshopify", "");
  const [isValid, setIsValid] = useState(true);
  const router = useRouter();

  const onBlur = (e: FormEvent<HTMLInputElement>) => {
    setIsValid(domain ? isValidDomain(domain) : true);
  };

  async function onClickLogin(e: FormEvent) {
    e.preventDefault();

    if (!isValidDomain(domain ?? "")) {
      toast.error("Enter a valid domain ending with .myshopify.com");
      return;
    }

    e.preventDefault();

    await startProviderAuthFlow(
      projectInfo.id,
      providerInfo.id,
      providerInfo.type,
      router.query,
      {
        shop: domain,
      },
    );
  }

  if (!router.isReady) {
    return null;
  } else if (!projectInfo) {
    return <div>Project not found</div>;
  }

  return (
    <LinkPage
      onSubmit={onClickLogin}
      project={projectInfo}
      provider={providerInfo}
      formElements={
        <>
          <div className="flex flex-row gap-1">
            <p>
              What is your <abbr>myShopify</abbr> domain?
            </p>
            <Tooltip
              placement="right"
              content="Every store on Shopify has a canonical URL of the format example.myshopify.com, which is used to uniquely identify it."
            >
              <InfoCircledIcon className="ml-1 mt-[-2px] inline-block h-4 w-4" />
            </Tooltip>
          </div>
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            onBlur={onBlur}
            placeholder="example.myshopify.com"
            className={twMerge(
              "bg-background focus:shadow-outline border-primary block w-full appearance-none rounded-md border px-4 py-2 leading-normal focus:outline-none",
              !isValid && "border-red-300",
            )}
          />
        </>
      }
    />
  );
}

export { getServerSideProps };

function isValidDomain(domain: string) {
  return !!domain.match(/^[a-z0-9][a-z0-9-_]*\.myshopify\.com$/i);
}

function MissingState({ project }: { project: ProjectInfo }) {
  return (
    <div className="fixed top-10 w-[500px] rounded-md bg-red-100 p-3 text-sm dark:bg-red-800">
      <strong>Error.</strong> Missing state parameter in the URL.{" "}
      <Tooltip
        content={`This parameter is used to tie your Shopify shop to your ${project.title} integration. Try going back to your ${project.title} settings and clicking to integrate again.`}
      >
        <InfoCircledIcon className="mt-[-2px] inline-block " />
      </Tooltip>
    </div>
  );
}
