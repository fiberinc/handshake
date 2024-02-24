"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ProviderInfo } from "../getProviderInfos";
import { useIsDarkMode } from "../providers/ProviderItem";

interface Props {
  infos: ProviderInfo[];
}

function ProviderGrid_({ infos }: Props) {
  const isDarkMode = useIsDarkMode();

  const els = infos.map((info) => (
    <Link key={info.id} href={`/providers#${info.id}`}>
      <div className="hover:bg-foreground text-contrast flex h-[45px] flex-row items-center gap-3 rounded-md border px-3.5">
        {info.hasLogo !== false && (
          <img
            onError={function () {
              const fallbackUrl = `/images/logos/${info.id}.svg`;
              // @ts-ignore
              if (this.src !== fallbackUrl) {
                // @ts-ignore
                this.src = fallbackUrl;
              }
            }}
            alt=""
            src={`/images/logos/${info.id}${isDarkMode ? "-dark" : ""}.svg`}
            width={20}
          />
        )}
        {info.title}
      </div>
    </Link>
  ));

  return <>{els}</>;
}

export const ProviderGrid = dynamic(() => Promise.resolve(ProviderGrid_), {
  ssr: false,
});
