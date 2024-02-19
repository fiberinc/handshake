import "~/styles/globals.css";

import { twMerge } from "tailwind-merge";

export const metadata = {
  title: "",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        />
        <link rel="shortcut icon" href="/favicon.png" />
        <meta property="og:description" content="TODO." />
        <meta property="og:image" content="/images/TODO.png" />
        <meta property="og:image:type" content="/images/TODO.png" />
        <meta property="og:image:width" content="/images/TODO.png" />
        <meta property="og:image:height" content="/images/TODO.png" />
      </head>

      <body
        className={twMerge(
          "bg-background",
          "text-default",
          "selection:text-white dark:selection:text-black",
          "selection:bg-fuchsia-300 selection:text-fuchsia-900",
        )}
      >
        {children}
      </body>
    </html>
  );
}
