"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

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
    <main className="flex h-full w-full flex-col gap-4 p-10">
      {inner}
      <footer className="text-sm">
        {process.env.NODE_ENV === "development" && (
          <Link href="/">Go back to home</Link>
        )}
      </footer>
    </main>
  );
}

function SuccessPage() {
  const searchParams = useSearchParams();

  return (
    <>
      <h2 className="flex flex-row gap-3 text-xl font-semibold">Success</h2>
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
      <h2 className="flex flex-row gap-3 text-xl font-semibold">Failure</h2>
      <p>Received params:</p>
      <pre>
        {JSON.stringify(Object.fromEntries(searchParams.entries()), null, 2)}
      </pre>
    </>
  );
}
