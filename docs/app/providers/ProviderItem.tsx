"use client";

import Link from "next/link";
import { useMedia, useTimeout } from "react-use";
import { ProviderInfo } from "../getProviderInfos";
import { MdxRender } from "./MdxRender";

export function ProviderItem(info: ProviderInfo) {
  return (
    <div key={info.id} id={info.id}>
      <div>
        <Link href={`/providers/#${info.id}`} className="inline-block w-fit">
          <div className="group relative flex h-[50px] w-fit cursor-pointer flex-row items-center gap-2">
            <div className="absolute left-[-25px] text-[24px] font-bold opacity-10 transition group-hover:opacity-40">
              #
            </div>
            {/* <div className="flex-inline h-[40px] w-[40px] items-center justify-center rounded-lg">
          <img
            src={
              isDarkMode
                ? `/handshake/images/logos/${info.id}.svg`
                : `/handshake/images/logos/${info.id}-dark.svg`
            }
            width="30px"
            alt={`${info.name} logo`}
          />
        </div> */}
            <h1 className="text-contrast text-page-header font-medium">
              {info.title}
            </h1>
          </div>
        </Link>
      </div>
      <br />

      <MdxRender {...info.serialized} />
    </div>
  );
}

export function useIsDarkMode() {
  useTimeout(600);
  return useMedia("(prefers-color-scheme: dark)");
}
