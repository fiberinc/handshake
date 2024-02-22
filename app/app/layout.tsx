import "~/styles/globals.css";

import { twMerge } from "tailwind-merge";

export const metadata = {
  title: "Handshake is running",
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
