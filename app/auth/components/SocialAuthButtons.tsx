"use client";

import { AppleIcon, GoogleIcon } from "@/app/svg-icons";
import { useState } from "react";

export default function SocialAuthButtons() {
  const [authError, setAuthError] = useState<"google" | "apple" | null>(null);

  function handleGoogleClick() {
    setAuthError(null);

    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google/callback`;
  }

  function handleAppleClick() {
    setAuthError(null);

    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/apple`;
  }

  return (
    <div className="Oauth-buttons w-full">
      {authError && (
        <div className="mb-2 flex justify-center">
          <p className="w-max rounded-full px-3 py-2 text-center text-[11px] text-white dark:bg-red-950/40 bg-red-900">
            {authError === "google" ? (
              <>
                Authentication with Google failed.
                <br className="sm:hidden" /> Please try again or sign up with
                email
              </>
            ) : (
              <>
                Authentication with Apple failed.
                <br className="sm:hidden" /> Please try again or sign up with
                email
              </>
            )}
          </p>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={handleGoogleClick}
          className={`flex flex-1 items-center justify-center gap-2 rounded-full border bg-(--color-bg-surface) py-3 text-sm font-medium transition-colors hover:border-(--color-action-primary) ${
            authError === "google" ? "border-red-600" : "border-transparent"
          }`}
        >
          <GoogleIcon />
          Continue with Google
        </button>

        <button
          type="button"
          onClick={handleAppleClick}
          className={`flex flex-1 items-center justify-center gap-2 rounded-full border bg-(--color-bg-surface) py-3 text-sm font-medium transition-colors hover:border-(--color-action-primary) ${
            authError === "apple" ? "border-red-600" : "border-transparent"
          }`}
        >
          <AppleIcon />
          Continue with Apple
        </button>
      </div>
    </div>
  );
}
