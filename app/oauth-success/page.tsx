"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { storeAuthTokens } from "@/lib/api";

export default function OAuthSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    if (!accessToken || !refreshToken) {
      setError("Missing authentication details. Please try signing in again.");
      return;
    }

    storeAuthTokens({ accessToken, refreshToken });
    router.push("/business/setup");
  }, [searchParams, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      {error ? (
        <>
          <p className="text-sm text-red-600 mb-4">{error}</p>
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
