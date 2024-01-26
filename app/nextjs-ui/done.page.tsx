// @ts-nocheck

import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();

  if (!router.isReady) {
    return <>loading</>;
  }

  if (router.query.error) {
    return <ErrorPage error={router.query.error as string} />;
  }

  return <div>Done</div>;
}

export function ErrorPage({ error }: { error: string }) {
  return <div>erroR:{error}</div>;
}
