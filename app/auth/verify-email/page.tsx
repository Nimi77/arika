"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "user.email";
  const [isResending, setIsResending] = useState(false);
  const [resent, setResent] = useState(false);

  async function handleResend() {
    setIsResending(true);

    try {
      // await resend verification request.
      await Promise.resolve();
      setResent(true);
    } catch (err) {
      // handle resend failure here
    } finally {
      setIsResending(false);
    }
  }

  return (
    <div className="flex w-full flex-col items-center">
      <h1 className="text-center text-2xl font-bold text-(--color-text) sm:text-3xl">
        Verify your email
      </h1>

      <p className="mt-2 text-center text-sm text-(--color-text-secondary)">
        We sent a verification link to{" "}
        <span className="font-medium text-white">{email}</span>. Click the link
        in your email to activate your account.
      </p>

      <div className="mt-8 flex w-full max-w-sm flex-col items-center gap-4 px-5 py-4">
        <button
          type="button"
          onClick={handleResend}
          disabled={isResending || resent}
          className={`w-full rounded-full py-3 font-medium transition-colors duration-200  ${
            resent
              ? "bg-(--color-accent-hover) text-white"
              : "bg-(--color-surface) text-(--color-text-secondary) hover:bg-neutral-500/15  "
          }`}
        >
          <Link href="/auth/profile-setup" className="w-full">
            {isResending
              ? "Sending..."
              : resent
                ? "Verification link sent"
                : "Resend verification link"}
          </Link>
        </button>
        <p className="text-center text-sm text-neutral-500">
          Wrong email address?{" "}
          <Link
            href="/auth/register"
            className="text-(--color-accent) hover:underline"
          >
            Change email
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-sm text-neutral-500">Loading...</p>
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
