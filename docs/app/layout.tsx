import { Metadata } from "next";
import Link from "next/link";
import { Toaster } from "sonner";
import "~/styles/globals.css";
import { REPO_URL } from "./routes";

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
      <Toaster />
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🫱🏻‍🫲🏽</text></svg>"
        />
      </head>
      <body className="bg-background text-default m-auto flex w-full flex-col gap-20 selection:bg-fuchsia-300 selection:text-fuchsia-900 ">
        <Nav />
        <div className="m-auto w-full px-5 lg:w-[900px] lg:px-0">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}

function Nav() {
  return (
    <nav className="bg-foreground relative border-b">
      {/* <div className="absolute left-6 top-[10px] text-[30px]">🫱🏻‍🫲🏽</div> */}
      <div className="m-auto flex h-[70px] flex-row items-center justify-between px-5 lg:w-[900px] lg:px-0">
        <Link href="/">
          <h1 className="text-contrast text-lg font-semibold">
            Handshake {/* 🫱🏻‍🫲🏽&nbsp;&nbsp; */}
          </h1>
        </Link>
        <div className="flex flex-row gap-10">
          <Link href="/providers">All providers</Link>
          <a
            href={REPO_URL}
            target="_blank"
            className="text-contrast font-medium"
          >
            On Github
          </a>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-foreground border-t">
      <div className="text-mono text-md m-auto flex flex-row flex-wrap justify-between gap-10 px-5 py-10  font-medium lg:w-[900px] lg:px-0">
        <div>
          A project by{" "}
          <a href="https://fiber.dev" className="underline">
            Fiber
          </a>
        </div>
        <a
          href="https://twitter.com/fiber_dev"
          className="hover:text-link"
          target="_blank"
        >
          @FIBER_dev
        </a>
        {/* <div>🫱🏻‍🫲🏽</div> */}
        <div>© 2024 Portalform Inc.</div>
      </div>
    </footer>
  );
}
