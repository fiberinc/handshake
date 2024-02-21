"use client";

import { useMedia, useTimeout } from "react-use";
import { MdxRender } from "~/ui/MdxRender";
import { ProviderInfo } from "../getProviderInfos";

export function ProviderItem(info: ProviderInfo) {
  const isDarkMode = useIsDarkMode();

  return (
    <div key={info.id} id={info.id}>
      <h1 className="text-contrast text-3xl font-medium">{info.name}</h1>

      <div className="flex h-[40px] w-[40px] items-center justify-center rounded-lg">
        <img
          src={
            isDarkMode
              ? `/handshake/images/logos/${info.id}.svg`
              : `/handshake/images/logos/${info.id}-dark.svg`
          }
          width="30px"
          alt={`${info.name} logo`}
        />
      </div>

      <MdxRender {...info.serialized} />
    </div>
  );
}

export function useIsDarkMode() {
  useTimeout(600);
  return useMedia("(prefers-color-scheme: dark)");
}
