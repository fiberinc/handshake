import { Head, Html, Main, NextScript } from "next/document";
import { twMerge } from "tailwind-merge";

export default function Document() {
  return (
    <Html>
      <Head />
      <body className={twMerge("text-white")}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
