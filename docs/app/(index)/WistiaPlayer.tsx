"use client";

import { useEffect, useRef } from "react";
import { useWindowSize } from "react-use";

export function WistiaPlayer() {
  const { width } = useWindowSize();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const script1 = document.createElement("script");
    script1.src = `https://fast.wistia.com/embed/medias/n1fsgrs00i.jsonp`;
    script1.async = true;
    const script2 = document.createElement("script");
    script2.src = "https://fast.wistia.com/assets/external/E-v1.js";
    script2.async = true;

    const div = document.createElement("div");
    div.innerHTML = `
    <div
    class="wistia_embed wistia_async_n1fsgrs00i seo=true videoFoam=false"
    style="position:relative;width:900px;max-width:100%;height:${Math.floor((Math.min(width, 900) * 455) / 700)}px"
  >
    <div
      class="wistia_swatch"
      style="height:100%;left:0;opacity:0;overflow:hidden;position:absolute;top:0;transition:opacity 200ms;width:100%;"
    >
      <img
        src="https://fast.wistia.com/embed/medias/n1fsgrs00i/swatch"
        style="filter:blur(5px);height:100%;object-fit:contain;width:100%;"
        alt=""
        aria-hidden="true"
        onload="this.parentNode.style.opacity=1;"
      />
    </div></div>`;

    ref.current.appendChild(script1);
    ref.current.appendChild(script2);
    ref.current.appendChild(div);

    return () => {
      if (ref.current) {
        ref.current.innerHTML = "";
      }
    };
  }, []);

  return <div ref={ref} className="" />;
}
