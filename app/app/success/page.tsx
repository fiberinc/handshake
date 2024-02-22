"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

// Only used if users are sent to this app without a callback.

export default function Page() {
  return (
    <div className="flex flex-col gap-4 p-5">
      <p>Success!</p>
      <p>State in the URL:</p>
      <Suspense>
        <Params />
      </Suspense>
    </div>
  );
}

function Params() {
  const params = useSearchParams();

  return (
    <pre className="w-full whitespace-normal break-words">
      {JSON.stringify(Object.fromEntries(params.entries()), null, 2)}
    </pre>
  );
}
