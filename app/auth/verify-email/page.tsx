"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertTriangle, CircleCheck, MailCheck } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { apiFetch } from "@/lib/api";
import ArikaLogo from "../components/ArikaLogo";
import { useSignupStore } from "@/store/signupStore";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const shouldReduceMotion = useReducedMotion();

  const clearSignupData = useSignupStore((state) => state.clearSignupData);

  const email = searchParams.get("email") || "";
  const token = searchParams.get("token");

  const [cooldown, setCooldown] = useState(20);
  const [isResendLoading, setIsResendLoading] = useState(false);
  const [isResendSuccessful, setIsResendSuccessful] = useState(false);
  const [isResendFormOpen, setIsResendFormOpen] = useState(false);
  const [resendEmail, setResendEmail] = useState(email);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [isAlreadyVerified, setIsAlreadyVerified] = useState(false);

  /*
   * Redirect to login after verification.
   */
  useEffect(() => {
    if (!isVerified && !isAlreadyVerified) return;

    const redirectTimer = setTimeout(() => {
      router.push("/auth/login");
    }, 4000);

    return () => clearTimeout(redirectTimer);
  }, [isVerified, isAlreadyVerified, router]);

  /*
   * Verify the token from the email link.
   */
  useEffect(() => {
    if (!token) return;

    const verificationToken = token;

    async function verify() {
      setIsVerifying(true);
      setVerifyError(null);
      setIsVerified(false);
      setIsAlreadyVerified(false);

      try {
        await apiFetch(
          `/auth/verify-email?token=${encodeURIComponent(verificationToken)}`,
          {
            method: "POST",
          },
        );
        clearSignupData();
        setIsVerified(true);
      } catch (err: unknown) {
        /*
         * Check if the account was already verified.
         */
        const apiError = err as {
          body?: { data?: { emailVerified?: boolean }; message?: string };
          message?: string;
        };
        const alreadyVerified =
          apiError?.body?.data?.emailVerified === true ||
          /already verified/i.test(apiError?.body?.message || "") ||
          /already verified/i.test(apiError?.message || "");

        if (alreadyVerified) {
          clearSignupData();
          setIsAlreadyVerified(true);
          setVerifyError(null);
        } else {
          setCooldown(0);

          setVerifyError(
            "This verification link is invalid or has expired. Please request a new one.",
          );
        }
      } finally {
        setIsVerifying(false);
      }
    }

    verify();
  }, [token, clearSignupData]);

  /*
   * Start the initial resend cooldown.
   */
  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  /*
   * Send a new verification email.
   */
  async function handleResend() {
    const emailToSend = resendEmail.trim();

    if (isResendLoading || !emailToSend) return;

    setIsResendLoading(true);
    setVerifyError(null);
    setIsResendSuccessful(false);

    const minimumVerificationTime = new Promise((resolve) => {
      setTimeout(resolve, 2500);
    });

    try {
      await Promise.all([
        apiFetch("/auth/resend-verification", {
          method: "POST",
          body: JSON.stringify({
            email: emailToSend,
          }),
        }),
        minimumVerificationTime,
      ]);

      setResendEmail(emailToSend);
      setCooldown(20);
      setIsResendSuccessful(true);
      setIsResendFormOpen(false);
      setIsResendLoading(false);
    } catch (err: unknown) {
      await minimumVerificationTime;

      const apiError = err as { status?: number };
      setIsResendLoading(false);

      if (apiError?.status === 404) {
        setVerifyError(
          "We couldn&apos;t find an account associated with this email address.",
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
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.5,
          ease: "easeOut",
        }}
        className="verify-email-content flex w-full flex-col items-center justify-center text-center"
        aria-live="polite"
        aria-atomic="true"
      >
        <div
          aria-hidden="true"
          className="flex h-24 w-24 items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-950/50"
        >
          <CircleCheck
            size={70}
            strokeWidth={1.8}
            className="text-(--color-action-primary)"
          />
        </div>

        <div className="mt-5 flex flex-col gap-2">
          <h1 className="text-xl font-bold tracking-[-0.015rem] text-(--color-text-primary)">
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
      </motion.div>
    );
  }

  /*
   * User opened an already verified link.
   */
  if (isAlreadyVerified) {
    return (
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.5,
          ease: "easeOut",
        }}
        className="verify-email-content flex w-full flex-col items-center justify-center text-center"
        aria-live="polite"
        aria-atomic="true"
      >
        <div
          aria-hidden="true"
          className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-950/50"
        >
          <MailCheck
            size={48}
            strokeWidth={1.8}
            className="text-(--color-action-primary)"
          />
        </div>

        <div className="mt-5 flex flex-col gap-2">
          <h1 className="text-xl font-bold tracking-[-0.015rem] text-(--color-text-primary)">
            Email Already Verified
          </h1>

          <p className="text-sm leading-6 text-(--color-text-subtle) sm:text-base">
            This email address has already been verified. Your Arika account is
            active and ready to use.
          </p>
        </div>

        <p className="mt-8 text-sm leading-5 text-(--color-text-subtle)">
          You’ll be redirected to the login page shortly.
        </p>
      </motion.div>
    );
  }

  /*
   * New verification email was sent.
   */
  if (isResendSuccessful) {
    return (
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.5,
          ease: "easeOut",
        }}
        className="verify-email-content flex w-full flex-col items-center justify-center text-center"
        aria-live="polite"
        aria-atomic="true"
      >
        <div
          aria-hidden="true"
          className="flex h-24 w-24 items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-950/50"
        >
          <CircleCheck
            size={70}
            strokeWidth={1.8}
            className="text-(--color-action-primary)"
          />
        </div>

        <div className="mt-5 flex w-full flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-[-0.015rem] text-(--color-text-primary) sm:text-3xl">
            Check Your Email
          </h1>

          <p className="text-sm leading-6 text-(--color-text-subtle)">
            We sent a new verification link to{" "}
            <span className="font-medium text-(--color-text-primary)">
              {resendEmail}
            </span>
            . Click the link in your email to activate your account.
          </p>
        </div>

        <p
          className="mt-8 text-sm leading-6 text-(--color-text-subtle)"
          role="status"
        >
          Please check your inbox and use the latest verification link.
        </p>

        <button
          type="button"
          onClick={handleResend}
          disabled={cooldown > 0 || isResendLoading}
          aria-disabled={cooldown > 0 || isResendLoading}
          aria-busy={isResendLoading}
          className={`mt-6 w-full rounded-full py-4 text-sm font-bold transition-all duration-250 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-action-primary) disabled:cursor-not-allowed ${
            cooldown > 0 || isResendLoading
              ? "cursor-not-allowed bg-(--color-bg-surface) text-(--color-text-subtle) opacity-60"
              : "cursor-pointer bg-(--color-action-primary) text-white hover:bg-(--color-action-primary-hover)"
          }`}
        >
          {isResendLoading
            ? "Sending verification link..."
            : cooldown > 0
              ? `Resend available in ${cooldown}s`
              : "Resend verification link"}
        </button>
      </motion.div>
    );
  }

  /*
   * Verification link is being checked or has expired.
   */
  if (token) {
    return (
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.5,
          ease: "easeOut",
        }}
        className="verify-email-content flex w-full flex-col items-center justify-center"
        aria-live="polite"
        aria-atomic="true"
      >
        {isVerifying && (
          <p className="text-sm text-(--color-text-subtle)">
            Verifying your email…
          </p>
        )}

        {!isVerifying && verifyError && !isResendFormOpen && (
          <div className="flex w-full flex-col items-center">
            <div
              aria-hidden="true"
              className="flex h-20 w-20 items-center justify-center rounded-full bg-[#b45309]/15 dark:bg-[#d97706]/20"
            >
              <AlertTriangle
                size={42}
                strokeWidth={1.8}
                className="text-(--color-warning)"
              />
            </div>

            <div className="mt-6 w-full">
              <div
                className="rounded-2xl border border-[#b45309]/20 bg-[#b45309]/5 p-4 dark:border-[#d97706]/20 dark:bg-[#d97706]/10"
                role="alert"
              >
                <p className="text-center text-sm leading-6 text-[#92400e] dark:text-[#fbbf24]">
                  {verifyError}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setVerifyError(null);
                  setResendEmail(email);
                  setIsResendFormOpen(true);
                }}
                className="mt-4 w-full rounded-full bg-(--color-action-primary) px-6 py-3.5 font-semibold text-white transition-all duration-250 ease-out hover:-translate-y-0.5 hover:bg-(--color-action-primary-hover) hover:shadow-[0_8px_20px_rgba(99,91,255,0.3)] active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-action-primary)"
              >
                Resend verification link
              </button>
            </div>
          </div>
        )}

        {!isVerifying && isResendFormOpen && (
          <div className="w-full">
            <ArikaLogo />
            <div className="flex flex-col gap-1 text-center mb-6">
              <h1 className="text-3xl font-extrabold tracking-[-0.32px] text-(--color-text-primary)">
                Resend Verification Link
              </h1>
              <p className="text-sm text-(--color-text-subtle)">
                Enter the email address you used to create your Arika account.
              </p>
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleResend();
              }}
              aria-labelledby="resend-verification-heading"
              aria-busy={isResendLoading}
              className="flex flex-col"
            >
              <div className="mb-6">
                <label
                  htmlFor="resend-email"
                  className="mb-2 block text-sm font-medium text-(--color-text-primary)"
                >
                  Email Address
                </label>

                <input
                  id="resend-email"
                  type="email"
                  value={resendEmail}
                  onChange={(event) => {
                    setResendEmail(event.target.value);
                    setVerifyError(null);
                  }}
                  autoComplete="email"
                  placeholder="Enter your email address"
                  disabled={isResendLoading}
                  aria-invalid={!!verifyError}
                  aria-describedby={
                    verifyError ? "resend-email-error" : undefined
                  }
                  className="w-full rounded-full border border-transparent px-5 py-3 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>
              {verifyError && (
                <p
                  id="resend-email-error"
                  className="mb-2 text-sm text-red-600 dark:text-(--color-text-error)"
                  role="alert"
                >
                  {verifyError}
                </p>
              )}
              <button
                type="submit"
                disabled={isResendLoading || !resendEmail.trim()}
                aria-busy={isResendLoading}
                className={`w-full rounded-full px-6 py-3.5 font-semibold transition-all duration-250 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-action-primary) ${
                  isResendLoading || !resendEmail.trim()
                    ? "cursor-not-allowed bg-(--color-bg-surface) text-(--color-text-subtle) opacity-60"
                    : "cursor-pointer bg-(--color-action-primary) text-white hover:bg-(--color-action-primary-hover)"
                }`}
              >
                {isResendLoading
                  ? "Sending verification link..."
                  : "Send verification link"}
              </button>
            </form>
          </div>
        )}
      </motion.div>
    );
  }

  /*
   * Default state after registration.
   */
  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.6,
        ease: "easeOut",
      }}
      className="verify-email-content flex w-full flex-col items-center justify-center"
      aria-live="polite"
      aria-atomic="true"
    >
      <ArikaLogo />
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
            id="resend-error"
            role="alert"
            className="w-full text-center text-sm text-red-600 dark:text-(--color-text-error)"
          >
            {verifyError}
          </p>
        )}

        <button
          type="button"
          onClick={handleResend}
          disabled={cooldown > 0 || isResendLoading || !email}
          aria-disabled={cooldown > 0 || isResendLoading || !email}
          aria-busy={isResendLoading}
          aria-describedby={verifyError ? "resend-error" : undefined}
          className={`w-full rounded-full px-6 py-3.5 font-semibold transition-all duration-250 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-action-primary) ${
            cooldown > 0 || isResendLoading || !email
              ? "cursor-not-allowed bg-(--color-bg-surface) text-(--color-text-subtle) opacity-60"
              : "cursor-pointer bg-(--color-action-primary) text-white hover:bg-(--color-action-primary-hover)"
          }`}
        >
          {isResendLoading
            ? "Sending verification link..."
            : cooldown > 0
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
    </motion.div>
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
