"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "user.email";

  const [isResending, setIsResending] = useState(true);
  const [cooldown, setCooldown] = useState(10);

  // Initial verification email has already been sent
  // before this page is reached.
  useEffect(() => {
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

    return () => clearInterval(timer);
  }, []);

  async function handleResend() {
    if (isResending) return;

    setIsResending(true);
    setCooldown(10);

    try {
      //  resend verification API here
      // await fetch("/api/auth/resend-verification", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ email }),
      // });

      // Simulate email request
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Failed to resend verification email:", error);

      // If sending fails, the user can try again
      setIsResending(false);
      setCooldown(0);
      return;
    }

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
  }

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
            href=""
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
