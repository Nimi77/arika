"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { apiFetch, storeAuthToken } from "@/lib/api";

function OAuthSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const accessToken = searchParams.get("accessToken");
  const hasMissingAccessToken = !accessToken;

  useEffect(() => {
    if (!accessToken) return;

    async function completeOAuthLogin(token: string) {
      try {
        storeAuthToken(token);

        const response = await apiFetch<{
          data: {
            setupCompleted: boolean;
          };
        }>("/business/me");

        if (response.data.setupCompleted) {
          router.replace("/dashboard");
        } else {
          router.replace("/business/setup");
        }
      } catch {
        router.replace("/business/setup");
      }
    }

    completeOAuthLogin(accessToken);
  }, [accessToken, router]);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      {hasMissingAccessToken ? (
        <>
          <p className="text-sm text-red-600 mb-4 dark:text-(--color-text-error)">
            Missing authentication details. Please try signing in again.
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
