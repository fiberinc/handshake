"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

const REPO_URL = "https://github.com/fiberinc/handshake";

export default function Page() {
  return (
    <Suspense>
      <InnerPage />
    </Suspense>
  );
}

function InnerPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    console.log("params are", Object.fromEntries(searchParams.entries()));
  }, [searchParams]);

  let inner;
  if (searchParams.get("error")) {
    inner = <FailurePage />;
  } else {
    inner = <SuccessPage />;
  }

  return (
    <main className="flex h-full min-h-screen w-full flex-col justify-between">
      <div className="flex h-full w-full flex-col gap-7 p-10">
        {inner}
        <div>
          {process.env.NODE_ENV === "development" && (
            <Link href="/">Go back to index</Link>
          )}
        </div>
      </div>
      <footer className="border-t p-10 text-sm">
        <p className="mb-1">
          This is Handshake&apos;s default callback page. Customize the{" "}
          <code>callback_uri</code> parameter to send users to your own website.{" "}
          <a href={REPO_URL} target="_blank">
            Read more.
          </a>
        </p>
      </footer>
    </main>
  );
}

function SuccessPage() {
  const searchParams = useSearchParams();

  return (
    <>
      <h2 className="flex flex-row gap-3 text-xl font-semibold">
        Handshake success!
      </h2>
      <p>Received params:</p>
      <pre>
        {JSON.stringify(Object.fromEntries(searchParams.entries()), null, 2)}
      </pre>
    </>
  );
}

function FailurePage() {
  const searchParams = useSearchParams();

  return (
    <>
      <h2 className="flex flex-row gap-3 text-xl font-semibold">
        OAuth Failed
      </h2>
      <p>Received params:</p>
      <pre>
        {JSON.stringify(Object.fromEntries(searchParams.entries()), null, 2)}
      </pre>
    </>
  );
}
