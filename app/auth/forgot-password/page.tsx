"use client";

import { useState } from "react";
import Link from "next/link";
import AuthInput from "../components/AuthInput";
import { apiFetch } from "@/lib/api";
import { Mail } from "lucide-react";
import Image from "next/image";
import logo from "@/public/logo.svg";

type ForgotPasswordStep = "email" | "check-email";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<ForgotPasswordStep>("email");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const canResend = isValidEmail && !isSubmitting;

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");

    if (!isValidEmail) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      await apiFetch("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({
          email: email.trim(),
        }),
      });

      setStep("check-email");
    } catch {
      setError("We couldn't send the reset link. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleResend() {
    setError("");

    if (!isValidEmail) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      await apiFetch("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({
          email: email.trim(),
        }),
      });
    } catch {
      setError("We couldn't resend the reset link. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (step === "check-email") {
    <div className="forgot-password-page">
      <div
        className="flex w-full flex-col items-center justify-center"
        aria-live="polite"
      >
        {/* Mail icon */}
        <div
          aria-hidden="true"
          className="flex h-24 w-24 items-center justify-center rounded-full bg-neutral-50 dark:bg-neutral-800/50"
        >
          <Mail size={68} strokeWidth={1.8} className="text-neutral-500" />
        </div>

        {/* Heading and description */}
        <div className="heading-text mt-4 mb-5 flex w-full flex-col items-center justify-center gap-2">
          <h1 className="text-3xl font-extrabold tracking-[-0.32px] text-(--color-text-primary)">
            Check your email
          </h1>

          <p className="max-w-md text-center text-sm text-(--color-text-subtle)">
            We've sent a password reset link to{" "}
            <span className="font-medium text-(--color-text-primary)">
              {email}
            </span>
            . Click the link inside the email to set a new password.
          </p>
        </div>

        {/* Error message */}
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
        <div className="flex w-full flex-col gap-2">
          <button
            type="button"
            onClick={handleResend}
            disabled={!canResend || isSubmitting}
            aria-disabled={!canResend || isSubmitting}
            aria-describedby={error ? "resend-error" : undefined}
            className={`w-full rounded-full py-3 text-sm font-bold transition-all duration-250 disabled:cursor-not-allowed disabled:opacity-60 ${
              canResend && !isSubmitting
                ? "cursor-pointer bg-(--color-action-primary) text-white hover:-translate-y-0.5 hover:bg-(--color-action-primary-hover) hover:shadow-[0_8px_20px_rgba(99,91,255,0.3)] active:translate-y-0"
                : "cursor-not-allowed bg-(--color-bg-surface) text-(--color-text-subtle)"
            }`}
          >
            {isSubmitting ? "Sending..." : "Resend Link"}
          </button>

          <p className="text-center text-sm text-(--color-text-subtle)">
            Didn't receive the email? Check your spam folder.
          </p>
        </div>
      </div>
    </div>;
  }

  return (
    <div className="forgot-password-page">
      <Link
        href="/"
        aria-label="Arika home"
        className="mb-4 flex justify-center"
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

      <div className="heading-text mb-6 flex flex-col items-center text-center">
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
        aria-label="Forgot password form"
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
        />

        <div className="flex flex-col gap-2">
          <button
            type="submit"
            disabled={!isValidEmail || isSubmitting}
            className={`mt-2 w-full rounded-full py-3 text-sm font-bold transition-all duration-250 disabled:cursor-not-allowed ${
              isValidEmail && !isSubmitting
                ? "cursor-pointer bg-(--color-action-primary) text-white hover:-translate-y-0.5 hover:bg-(--color-action-primary-hover) hover:shadow-[0_8px_20px_rgba(99,91,255,0.3)] active:translate-y-0"
                : "cursor-not-allowed bg-(--color-bg-surface) text-(--color-text-subtle)"
            }`}
          >
            {isSubmitting ? "Sending Link..." : "Send Reset Link"}
          </button>

          <p className="text-center text-sm text-(--color-text-subtle)">
            We'll email you a secure recovery link.
          </p>
        </div>
      </form>
    </div>
  );
}
