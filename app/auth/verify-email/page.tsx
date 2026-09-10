"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { CircleCheck } from "lucide-react";

import { apiFetch } from "@/lib/api";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";
  const token = searchParams.get("token");

  const [isResending, setIsResending] = useState(true);
  const [cooldown, setCooldown] = useState(10);

  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);

  const [isVerified, setIsVerified] = useState(false);
  const [isAlreadyVerified, setIsAlreadyVerified] = useState(false);

  /*
   * Redirect the user to login after
   * successful or already-completed verification.
   */
  useEffect(() => {
    if (!isVerified && !isAlreadyVerified) return;

    const redirectTimer = setTimeout(() => {
      router.push("/auth/login");
    }, 4000);

    return () => clearTimeout(redirectTimer);
  }, [isVerified, isAlreadyVerified, router]);

  /*
   * Verify the email when the user clicks the
   * verification link in their email.
   */
  useEffect(() => {
    if (!token) return;

    const verificationToken = token;

    async function verify() {
      setIsVerifying(true);
      setVerifyError(null);
      setIsAlreadyVerified(false);

      try {
        await apiFetch(
          `/auth/verify-email?token=${encodeURIComponent(verificationToken)}`,
          {
            method: "POST",
          },
        );

        setIsVerified(true);
      } catch (err: any) {
        const alreadyVerified =
          err?.body?.data?.emailVerified === true ||
          /already verified/i.test(err?.body?.message || "") ||
          /already verified/i.test(err?.message || "");

        if (alreadyVerified) {
          setIsAlreadyVerified(true);
          setVerifyError(null);
        } else {
          setVerifyError(
            "This verification link is invalid or has expired. Please request a new one.",
          );
        }
      } finally {
        setIsVerifying(false);
      }
    }

    verify();
  }, [token]);

  /*
   * Initial resend cooldown.
   *
   * The user cannot resend immediately after
   * arriving on the verification page.
   */
  useEffect(() => {
    if (token) return;

    if (cooldown <= 0) {
      setIsResending(false);
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

    return () => clearInterval(timer);
  }, [cooldown, token]);

  /*
   * Resend verification email.
   */
  async function handleResend() {
    if (isResending || !email) return;

    setIsResending(true);
    setVerifyError(null);

    const minimumVerificationTime = new Promise((resolve) => {
      setTimeout(resolve, 2500);
    });

    try {
      await Promise.all([
        apiFetch("/auth/resend-verification", { method: "POST" }),
        minimumVerificationTime,
      ]);

      // Start a new cooldown after successfully resending.
      setCooldown(50);
    } catch (err: any) {
      await minimumVerificationTime;

      setIsResending(false);
      setCooldown(0);

      if (err?.status === 404) {
        setVerifyError(
          "We couldn't find an account associated with this email address.",
        );
      } else {
        setVerifyError(
          "Unable to resend the verification email. Please try again.",
        );
      }
    }
  }

  /*
   * Email successfully verified.
   */
  if (isVerified) {
    return (
      <div
        className="verify-email-content -mt-4 flex w-full flex-col items-center justify-center text-center"
        aria-live="polite"
      >
        <div
          aria-hidden="true"
          className="mt-4 flex items-center justify-center rounded-full"
        >
          <CircleCheck
            size={70}
            strokeWidth={1.8}
            className="text-(--color-action-primary)"
          />
        </div>

        <div className="mt-5 flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-[-0.015rem] text-(--color-text-primary)">
            Email Successfully Verified
          </h1>

          <p className="text-sm leading-6 text-(--color-text-subtle) sm:text-base">
            Your email has been verified and your account is now active. You’re
            all set to get started with Arika.
          </p>
        </div>

        <p className="mt-12 text-sm leading-5 text-(--color-text-subtle)">
          You’ll be redirected to the login page shortly...
        </p>
      </div>
    );
  }

  /*
   * User clicked the verification link again
   * after their email was already verified.
   */
  if (isAlreadyVerified) {
    return (
      <div
        className="verify-email-content flex w-full flex-col gap-4 items-center justify-center text-center"
        aria-live="polite"
      >
        <p className="text-sm leading-6 text-(--color-text-subtle) sm:text-base">
          This email address has already been verified. Your Arika account is
          active and ready to use.
        </p>
        <p className="mt-10 text-sm leading-5 text-(--color-text-subtle)">
          You’ll be redirected to the login page shortly.
        </p>
      </div>
    );
  }

  /*
   * User clicked the verification link and
   * the token is currently being verified.
   */
  if (token) {
    return (
      <div
        className="verify-email-content flex flex-col items-center justify-center gap-4"
        aria-live="polite"
      >
        {isVerifying && (
          <p className="text-sm text-(--color-text-subtle)">
            Verifying your email…
          </p>
        )}

        {!isVerifying && verifyError && (
          <>
            <div
              role="alert"
              className="flex w-full flex-col items-center justify-center gap-2"
            >
              <p className="text-center text-sm leading-6 text-(--color-text-error) sm:text-base">
                {verifyError}
              </p>

              <p className="text-center text-sm leading-6 text-(--color-text-secondary) sm:text-base">
                Please check that you are using the correct verification link
                from your email. If the link has expired, you can return to
                registration and request a new verification email.
              </p>
            </div>

            <Link
              href="/auth/register/email"
              className="mt-6 flex w-full items-center justify-center rounded-full bg-(--color-action-primary) px-6 py-3.5 text-center text-sm font-semibold text-white transition-all duration-250 ease-out hover:-translate-y-0.5 hover:bg-(--color-action-primary-hover) hover:shadow-[0_8px_20px_rgba(99,91,255,0.3)] active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-action-primary)"
            >
              Back to registration
            </Link>
          </>
        )}
      </div>
    );
  }

  /*
   * Default state:
   * User has registered but has not clicked
   * the verification link yet.
   */
  return (
    <div
      className="verify-email-content -mt-4 flex flex-col items-center justify-center"
      aria-live="polite"
    >
      <div className="email-content-text">
        <h1 className="text-center text-2xl font-bold tracking-[-0.015rem] text-(--color-text-primary) sm:text-3xl">
          Verify Your Email
        </h1>

        <p className="mt-2 text-center text-sm leading-5 text-(--color-text-secondary)">
          We sent a verification link to{" "}
          <span className="font-medium text-(--color-text-primary)">
            {email || "your email address"}
          </span>
          . Click the link in your email to activate your account.
        </p>
      </div>

      <div className="mt-8 flex w-full flex-col items-center gap-2">
        {verifyError && (
          <p
            role="alert"
            className="w-full text-center text-sm text-red-600 dark:text-(--color-text-error)"
          >
            {verifyError}
          </p>
        )}

        <button
          type="button"
          onClick={handleResend}
          disabled={isResending || !email}
          aria-disabled={isResending || !email}
          className={`w-full rounded-full px-6 py-3.5 font-semibold transition-all duration-250 ${
            isResending || !email
              ? "cursor-not-allowed bg-(--color-bg-surface) text-(--color-text-subtle) opacity-60"
              : "cursor-pointer bg-(--color-action-primary) text-white hover:bg-(--color-action-primary-hover)"
          }`}
        >
          {isResending
            ? `Resend available in ${cooldown}s`
            : "Resend verification link"}
        </button>

        <p className="text-center text-sm text-(--color-text-subtle)">
          Wrong email address?{" "}
          <Link
            href="/auth/register/email"
            className="font-medium text-(--color-action-primary) hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-action-primary)"
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
