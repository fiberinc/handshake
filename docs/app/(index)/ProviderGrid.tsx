"use client";

import Link from "next/link";
import { ProviderInfo } from "../getProviderInfos";
import { useIsDarkMode } from "../providers/ProviderItem";

interface Props {
  infos: ProviderInfo[];
}

export function ProviderGrid({ infos }: Props) {
  const isDarkMode = useIsDarkMode();

  const els = infos.map((info) => (
    <Link key={info.id} href={`/providers#${info.id}`}>
      <div className="hover:bg-foreground text-contrast flex flex-row items-center gap-3 rounded-md border px-3.5 py-2">
        {info.logoUrl && (
          <img
            alt=""
            src={isDarkMode ? info.darkLogoUrl! : info.logoUrl}
            width={20}
          />
        )}
        {info.title}
      </div>
    </Link>
  ));

  return <>{els}</>;
}
