"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import AuthInput from "../components/AuthInput";
import { apiFetch } from "@/lib/api";
import { Mail } from "lucide-react";
import Image from "next/image";
import logo from "@/public/logo.svg";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type ForgotPasswordStep = "email" | "check-email";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<ForgotPasswordStep>("email");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  /*
   * Move focus to the new heading whenever
   * the page changes between steps.
   *
   * This is important for keyboard and screen-reader
   * users because the content changes without a
   * traditional page navigation.
   */
  useEffect(() => {
    if (step === "check-email") {
      requestAnimationFrame(() => {
        headingRef.current?.focus();
      });
    }
  }, [step]);

  function handleEmailChange(value: string) {
    setEmail(value);
    setError("");
  }

  function handleEmailBlur() {
    if (!email.trim()) return;

    if (!isValidEmail) {
      setError("Please enter a valid email address.");
    }
  }

  // Helper function to force a minimum delay.
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");

    if (!isValidEmail) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      await Promise.all([
        apiFetch("/auth/forgot-password", {
          method: "POST",
          body: JSON.stringify({
            email: email.trim(),
          }),
        }),
        delay(1500),
      ]);

      setStep("check-email");
    } catch (err: unknown) {
      await delay(1500);

      const apiError = err as { status?: number };

      if (apiError?.status === 404) {
        setError(
          "We couldn&apos;t find an account associated with this email address.",
        );
      } else {
        setError("We couldn&apos;t send the reset link. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {step === "email" ? (
        <motion.div
          key="email"
          initial={shouldReduceMotion ? { opacity: 1 } : { x: 0, opacity: 1 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { x: -30, opacity: 0 }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 0.3, ease: "easeOut" }
          }
          className="forgot-password-page"
        >
          <Link
            href="/"
            aria-label="Arika home"
            className="mb-4 flex justify-center rounded-md"
          >
            <Image
              src={logo}
              alt=""
              width={70}
              height={70}
              className="h-12 w-auto"
              priority
            />
          </Link>

          <div
            id="forgot-password-heading"
            className="heading-text mb-6 flex flex-col items-center text-center"
          >
            <h1 className="text-3xl font-extrabold tracking-[-0.32px] text-(--color-text-primary)">
              Reset your password
            </h1>

            <p className="mt-2 max-w-md text-sm text-(--color-text-subtle)">
              Enter your registered email address and we will send you a link to
              reset your password.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            aria-labelledby="forgot-password-heading"
            aria-busy={isSubmitting}
            className="flex flex-col gap-4"
          >
            <AuthInput
              id="email"
              label="Email Address"
              type="email"
              value={email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              error={error}
              autoComplete="email"
            />

            <div className="flex flex-col gap-2">
              <button
                type="submit"
                disabled={!isValidEmail || isSubmitting}
                aria-busy={isSubmitting}
                className={`mt-2 w-full rounded-full py-4 text-sm font-bold transition-all duration-250 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-action-primary) disabled:cursor-not-allowed ${
                  isValidEmail && !isSubmitting
                    ? "cursor-pointer bg-(--color-action-primary) text-white hover:-translate-y-0.5 hover:bg-(--color-action-primary-hover) hover:shadow-[0_8px_20px_rgba(99,91,255,0.3)] active:translate-y-0"
                    : "cursor-not-allowed bg-(--color-bg-surface) text-(--color-text-subtle)"
                }`}
              >
                {isSubmitting ? "Sending Link..." : "Send Reset Link"}
              </button>

              <p className="text-center text-sm text-(--color-text-subtle)">
                We&apos;ll email you a secure recovery link.
              </p>
            </div>
          </form>
        </motion.div>
      ) : (
        <motion.div
          key="check-email"
          initial={shouldReduceMotion ? { opacity: 1 } : { x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { x: -30, opacity: 0 }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 0.3, ease: "easeOut" }
          }
          className="forgot-password-page"
        >
          <div
            className="flex w-full flex-col items-center justify-center"
            aria-live="polite"
            aria-atomic="true"
          >
            {/* Mail icon */}
            <div
              aria-hidden="true"
              className="flex h-24 w-24 items-center justify-center rounded-full bg-neutral-50 dark:bg-neutral-800/50"
            >
              <Mail size={68} strokeWidth={1.8} className="text-neutral-500" />
            </div>

            {/* Heading and description */}
            <div className="heading-text mt-4 mb-10 flex w-full flex-col items-center justify-center gap-2">
              <h1
                ref={headingRef}
                tabIndex={-1}
                className="text-center text-3xl font-extrabold tracking-[-0.32px] text-(--color-text-primary) focus-visible:outline-none"
              >
                Check Your Email
              </h1>

              <p className="max-w-md text-center text-sm text-(--color-text-subtle)">
                We&apos;ve sent a password reset link to{" "}
                <span className="font-medium text-(--color-text-primary)">
                  {email}
                </span>
                . Click the link inside the email to set a new password.
              </p>
            </div>

            {/* Resend status and error */}
            <div className="flex w-full flex-col gap-2">
              {error && (
                <p
                  id="resend-error"
                  role="alert"
                  aria-live="assertive"
                  className="mb-2 w-full text-center text-xs text-red-600 dark:text-(--color-text-error)"
                >
                  {error}
                </p>
              )}

              {/* Resend */}
              <button
                type="button"
                disabled
                aria-busy={isSubmitting}
                className="w-full rounded-full py-4 text-sm font-bold bg-(--color-bg-surface) text-(--color-text-subtle) transition-all duration-250 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Reset Password
              </button>

              <p className="text-center text-sm text-(--color-text-subtle)">
                Didn&apos;t receive the email? Check your spam folder.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
