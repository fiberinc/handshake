// @ts-nocheck

import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { FormEvent, PropsWithChildren, useEffect } from "react";
import { getProjectInfo } from "../../../handshake/dist";
import { ProjectInfo, ProviderInfo } from "../../../handshake/src/types";
import { linkOptions } from "../../link-config";
import { LinkPage } from "./lib/LinkPage";
import { startProviderAuthFlow } from "./lib/startFlow";

export interface Props {
  providerInfo: ProviderInfo;
  projectInfo: ProjectInfo;
  autoRedirect: boolean;
}

export default function Page({
  providerInfo,
  projectInfo,
  autoRedirect,
}: Props) {
  const router = useRouter();

  useEffect(() => {
    if (!autoRedirect) {
      return;
    }
    start();
  }, [router.isReady]);

  if (autoRedirect) {
    return null;
  }

  if (!providerInfo) {
    return (
      <ErrorPage>
        Unknown provider &apos;{router.query.provider}&apos;
      </ErrorPage>
    );
  } else if (!projectInfo) {
    return (
      <ErrorPage>Unknown project &apos;{router.query.project}&apos;</ErrorPage>
    );
  }

  function start() {
    startProviderAuthFlow(
      projectInfo.id,
      providerInfo!.id,
      providerInfo!.type,
      {
        accountId: router.query.account_id as string | undefined,
        state: router.query.state as string | undefined,
        redirectUri: router.query.redirect_uri as string | undefined,
      },
    );
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    start();
  }

  if (!router.isReady) {
    return null;
  }

  return (
    <LinkPage
      project={projectInfo}
      provider={providerInfo}
      onSubmit={onSubmit}
    />
  );
}

export function ErrorPage({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-2">
      {children}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
  resolvedUrl,
}) => {
  if (!query.project) {
    throw Error("No query.project");
  }

  const projectInfo = await getProjectInfo(
    linkOptions,
    query.project as string,
  );
  if (!projectInfo) {
    console.warn(`Project '${query.project}' not found`);
    return {
      notFound: true,
    };
  }

  let providerId: string;
  if (query.provider) {
    providerId = query.provider as string;
  } else {
    providerId = resolvedUrl.split("/")[2];
  }

  const provider = linkOptions.providers.find((f) => f.id === providerId);

  if (!provider) {
    console.warn(`Provider '${providerId}' not found`);

    return {
      notFound: true,
    };
  }

  return {
    props: {
      projectInfo,
      providerInfo: {
        id: provider?.id,
        type: provider.type,
        title: provider.metadata.title,
        logo: provider.metadata.logo,
      },
      autoRedirect: false,
    },
  };
};
