"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { storeAuthToken } from "@/lib/api";

function OAuthSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");

    if (!accessToken) {
      setError("Missing authentication details. Please try signing in again.");
      return;
    }

    storeAuthToken(accessToken);

    router.push("/business/setup");
  }, [searchParams, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      {error ? (
        <>
          <p className="text-sm text-red-600 mb-4 dark:text-(--color-text-error)">
            {error}
          </p>
          <button
            type="button"
            onClick={() => router.push("/auth/login")}
            className="text-sm text-(--color-action-primary) font-medium hover:underline"
          >
            Back to login
          </button>
        </>
      ) : (
        <p className="text-sm text-(--color-text-subtle)">Signing you in…</p>
      )}
    </div>
  );
}

export default function OAuthSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-sm text-neutral-500">Loading...</p>
        </div>
      }
    >
      <OAuthSuccessContent />
    </Suspense>
  );
}
