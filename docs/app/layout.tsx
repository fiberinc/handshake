import { Metadata } from "next";
import Link from "next/link";
import "~/styles/globals.css";

export const metadata: Metadata = {
  title: "Handshake – OAuth made easy",
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
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🫱🏻‍🫲🏽</text></svg>"
        />
      </head>
      <body className="bg-background text-default m-auto flex w-full flex-col gap-20 selection:bg-fuchsia-300 selection:text-fuchsia-900 ">
        <Nav />
        <div className="m-auto w-full px-5 md:px-0 lg:w-[900px] ">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}

function Nav() {
  return (
    <nav className="bg-foreground relative">
      <div className="absolute left-6 top-2 text-[30px]">🫱🏻‍🫲🏽</div>
      <div className="m-auto flex h-[60px] flex-row items-center justify-between px-5 md:px-0 lg:w-[900px]">
        <Link href="/">
          <h1 className="text-contrast text-lg font-semibold">Handshake </h1>
        </Link>
        <div className="flex flex-row gap-10">
          <Link href="/providers">Provider Docs</Link>
          <a href="/providers" target="_blank" className="text-contrast">
            On Github
          </a>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-foreground">
      <div className="text-mono text-md m-auto flex flex-row flex-wrap justify-between gap-10 px-5 py-10 md:px-0 lg:w-[900px]">
        <div>
          This is a <a href="https://fiber.dev">Fiber</a> project.
        </div>
        <a href="https://twitter.com/fiber_dev" className="hover:text-link">
          @FIBER_dev
        </a>
        <div>🫱🏻‍🫲🏽</div>
        <div>© 2024 Portalform Inc, Inc.</div>
      </div>
    </footer>
  );
}
