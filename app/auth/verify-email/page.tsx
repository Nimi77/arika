"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "user.email";
  const token = searchParams.get("token");

  const [isResending, setIsResending] = useState(true);
  const [cooldown, setCooldown] = useState(10);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);

  // If the URL has a verification token (user clicked the email link),
  // confirm it with the backend, then show success.
  useEffect(() => {
    if (!token) return;
    const verificationToken = token;
    async function verify() {
      setIsVerifying(true);
      setVerifyError(null);
      try {
        await apiFetch(
          `/auth/verify-email?token=${encodeURIComponent(verificationToken)}`,
          {
            method: "POST",
          },
        );
        setIsVerified(true);
      } catch (err) {
        setVerifyError(
          "This verification link is invalid or has expired. Please request a new one.",
        );
      } finally {
        setIsVerifying(false);
      }
    }

    verify();
  }, [token]);

  // Countdown for the "resend" button — only relevant while waiting,
  // i.e. when there's no token in the URL yet.
  async function handleResend() {
    if (isResending) return;

    setIsResending(true);
    setVerifyError(null);

    try {
      await apiFetch("/auth/resend-verification", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setCooldown(50);

      const timer = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsResending(false);
            return 0;
          }

          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      setIsResending(false);
      setCooldown(0);
      setVerifyError(
        "Unable to resend the verification email. Please try again.",
      );
    }
  }

  // Success state — verification just completed
  if (isVerified) {
    return (
      <div className="verify-email-content flex flex-col justify-center items-center gap-4">
        <h1 className="text-center text-2xl font-bold tracking-[-0.015rem] text-(--color-text-primary) sm:text-3xl">
          Email Successfully Verified
        </h1>
        <p className="text-sm text-(--color-text-subtle) text-center">
          Your account is now active.
        </p>
        <button
          type="button"
          onClick={() => router.push("/auth/login")}
          className="w-full rounded-full bg-(--color-action-primary) py-3 text-sm font-semibold text-white hover:bg-(--color-action-primary-hover) transition-colors"
        >
          Continue to Login
        </button>
      </div>
    );
  }

  // While actively verifying a token from the email link
  if (token) {
    return (
      <div className="verify-email-content flex flex-col justify-center items-center gap-4">
        {isVerifying && (
          <p className="text-sm text-(--color-text-subtle)">
            Verifying your email…
          </p>
        )}
        {verifyError && (
          <>
            <p className="text-sm text-red-600 text-center dark:text-(--color-text-error)">
              {verifyError}
            </p>
            <Link
              href="/auth/register/email"
              className="text-sm font-medium text-(--color-action-primary) hover:underline"
            >
              Back to registration
            </Link>
          </>
        )}
      </div>
    );
  }

  // Default: waiting for the user to check their email
  return (
    <div className="verify-email-content flex flex-col justify-center items-center gap-8">
      <div className="text">
        <h1 className="text-center text-2xl font-bold tracking-[-0.015rem] text-(--color-text-primary) sm:text-3xl">
          Verify Your Email
        </h1>

        <p className="mt-2 text-center text-sm leading-5 text-(--color-text-secondary)">
          We sent a verification link to{" "}
          <span className="font-medium text-(--color-text-primary)">
            {email}
          </span>
          . Click the link in your email to activate your account.
        </p>
      </div>

      <div className="flex w-full flex-col items-center gap-2">
        <button
          type="button"
          onClick={handleResend}
          disabled={isResending}
          className={`w-full rounded-full px-6 py-4 font-semibold transition-all duration-250 ${
            isResending
              ? "cursor-not-allowed bg-(--color-bg-surface) text-(--color-text-subtle) opacity-60"
              : "bg-(--color-action-primary) text-white hover:bg-(--color-action-primary-hover)"
          }
  `}
        >
          {isResending
            ? `Resend available in ${cooldown}s`
            : "Resend verification link"}
        </button>

        <p className="text-center text-sm text-(--color-text-subtle)">
          Wrong email address?{" "}
          <Link
            href="/auth/register/email"
            className="font-medium text-(--color-action-primary) hover:underline"
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
