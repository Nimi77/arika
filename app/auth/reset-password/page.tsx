"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CircleCheck, CircleX } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { apiFetch } from "@/lib/api";
import logo from "@/public/logo.svg";
import PasswordInput from "../components/PasswordInput";
import FormBanner from "../components/FormBanner";

const REQUIREMENTS = [
  {
    label: "Minimum 8 characters",
    test: (v: string) => v.length >= 8,
  },
  {
    label: "At least 1 uppercase & 1 lowercase character",
    test: (v: string) => /[a-z]/.test(v) && /[A-Z]/.test(v),
  },
  {
    label: "At least 1 number",
    test: (v: string) => /\d/.test(v),
  },
  {
    label: "At least 1 special character (!@#$%^*)",
    test: (v: string) => /[!@#$%^*]/.test(v),
  },
];

type ResetPasswordStep = "form" | "success" | "expired";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const shouldReduceMotion = useReducedMotion();

  const token = searchParams.get("token");

  const [step, setStep] = useState<ResetPasswordStep>(
    token ? "form" : "expired",
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const headingRef = useRef<HTMLHeadingElement>(null);

  type PasswordField = "password" | "confirmPassword";

  useEffect(() => {
    if (step === "form") return;

    requestAnimationFrame(() => {
      headingRef.current?.focus();
    });
  }, [step]);

  function validate(field?: PasswordField) {
    const next: Record<string, string> = {};

    if (
      (field === "password" || !field) &&
      !REQUIREMENTS.every((requirement) => requirement.test(password))
    ) {
      next.password = "Password doesn't meet the requirements";
    }

    if (field === "confirmPassword" || !field) {
      if (!confirmPassword) {
        next.confirmPassword = "Please confirm your password";
      } else if (confirmPassword !== password) {
        next.confirmPassword = "Passwords don't match";
      }
    }

    if (!field) {
      setErrors(next);
    }

    return Object.keys(next).length === 0;
  }

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setErrors({});

    if (!token) {
      setErrors({
        form: "This reset link is invalid or has expired.",
      });
      return;
    }

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      await Promise.all([
        apiFetch("/auth/reset-password", {
          method: "POST",
          body: JSON.stringify({
            token,
            newPassword: password,
          }),
        }),
        delay(1500),
      ]);

      setStep("success");
    } catch (error: unknown) {
      const apiError = error as {
        body?: {
          message?: string | { message?: string | string[] };
        };
      };

      const responseMessage = apiError.body?.message;

      const message =
        typeof responseMessage === "string"
          ? responseMessage
          : Array.isArray(responseMessage?.message)
            ? responseMessage.message.join(" ")
            : responseMessage?.message;

      if (message?.toLowerCase().includes("expired")) {
        setStep("expired");
        return;
      }

      setErrors({
        form: "We couldn't reset your password. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  /*
   * SUCCESS STATE
   */
  if (step === "success") {
    return (
      <motion.div
        initial={
          shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }
        }
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
        className="reset-password-page w-full"
      >
        <div
          className="flex flex-col items-center gap-4 text-center"
          role="status"
          aria-labelledby="password-reset-success-title"
        >
          {/* Checked logo */}
          <div
            aria-hidden="true"
            className="flex h-24 w-24 items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-950/50"
          >
            <CircleCheck
              size={64}
              strokeWidth={1.8}
              className="text-(--color-action-primary)"
            />
          </div>

          <div className="password-reset flex flex-col gap-2">
            <h1
              ref={headingRef}
              id="password-reset-success-title"
              tabIndex={-1}
              className="text-xl font-extrabold text-(--color-text-primary) focus-visible:outline-none sm:text-2xl"
            >
              Password updated
            </h1>

            <p className="text-sm leading-5 text-(--color-text-subtle)">
              Your password has been changed successfully. You can now sign in
              to your Arika account with your new credentials.
            </p>
          </div>

          <div className="mt-2 w-full">
            <Link
              href="/auth/login"
              className="block w-full rounded-full bg-(--color-action-primary) py-4 text-center text-sm font-semibold text-white transition-colors hover:bg-(--color-action-primary-hover)"
            >
              Sign in to your account
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  /*
   * EXPIRED STATE
   */
  if (step === "expired") {
    return (
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.5,
          ease: "easeOut",
        }}
        className="password-expired flex flex-col items-center text-center"
        role="alert"
        aria-labelledby="reset-link-expired-title"
      >
        {/* Cancel logo */}
        <div
          aria-hidden="true"
          className="flex h-24 w-24 items-center justify-center rounded-full bg-[#b45309]/15 dark:bg-[#d97706]/20"
        >
          <CircleX
            size={66}
            strokeWidth={1.8}
            className="text-(--color-warning)"
          />
        </div>

        <div className="mt-4 mb-8 flex flex-col gap-1.5">
          <h1
            ref={headingRef}
            id="reset-link-expired-title"
            tabIndex={-1}
            className="text-xl font-extrabold text-(--color-text-primary) focus-visible:outline-none sm:text-2xl"
          >
            Reset link expired
          </h1>

          <p className="text-sm leading-5 text-(--color-text-subtle)">
            For your security, password reset links expire after 30 minutes.
            Please request a new link to proceed.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3">
          <Link
            href="/auth/forgot-password"
            className="block w-full rounded-full bg-(--color-warning) py-4 text-center text-sm font-bold text-white transition-colors duration-200 ease-out hover:-translate-y-0.5 hover:bg-amber-900/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-warning) dark:hover:bg-amber-500/70"
          >
            Request a New Reset Link
          </Link>

          <Link
            href="/auth/login"
            className="block w-full rounded-full bg-(--color-bg-surface) py-4 text-center text-sm font-bold text-(--color-text-secondary) shadow transition-colors duration-200 ease-in-out hover:bg-neutral-100/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-action-primary)"
          >
            Back to Sign In
          </Link>
        </div>
      </motion.div>
    );
  }

  /*
   * RESET PASSWORD FORM
   */
  return (
    <div className="reset-password-page w-full">
      <Link
        href="/"
        aria-label="Arika home"
        className="mb-4 flex justify-center rounded-sm"
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

      <div className="heading-text mb-6 text-center">
        <h1
          id="reset-password-title"
          className="text-2xl font-extrabold tracking-[-0.32px] text-(--color-text-primary)"
        >
          Create new password
        </h1>

        <p
          id="reset-password-description"
          className="text-sm text-(--color-text-subtle)"
        >
          Your new password must meet our security standards.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
        aria-labelledby="reset-password-title"
        aria-describedby="reset-password-description"
        aria-busy={isSubmitting}
      >
        {errors.form && (
          <FormBanner
            message={errors.form}
            actionLabel=""
            onAction={() => {}}
          />
        )}
        <PasswordInput
          id="password"
          label="New password"
          value={password}
          onChange={(value) => {
            setPassword(value);

            setErrors((current) => ({
              ...current,
              password: "",
              form: "",
            }));
          }}
          onBlur={() => validate("password")}
          error={errors.password}
        />

        <PasswordInput
          id="confirmPassword"
          label="Confirm new password"
          value={confirmPassword}
          onChange={(value) => {
            setConfirmPassword(value);

            setErrors((current) => ({
              ...current,
              confirmPassword: "",
              form: "",
            }));
          }}
          onBlur={() => validate("confirmPassword")}
          error={errors.confirmPassword}
        />

        <ul
          aria-label="Password requirements"
          className="-mt-2 flex flex-col gap-1 text-xs text-(--color-text-secondary)"
        >
          {REQUIREMENTS.map((requirement) => {
            const isMet = requirement.test(password);

            return (
              <li
                key={requirement.label}
                aria-label={`${requirement.label}: ${
                  isMet ? "met" : "not met"
                }`}
                className={isMet ? "text-(--color-action-primary)" : ""}
              >
                • {requirement.label}
              </li>
            );
          })}
        </ul>

        <div className="flex flex-col items-center justify-center gap-2">
          <button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className="w-full rounded-full bg-(--color-action-primary) py-4 text-sm font-semibold text-white transition-colors hover:bg-(--color-action-primary-hover) disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Resetting password..." : "Reset password"}
          </button>

          <Link
            href="/auth/login"
            className="block w-full rounded-full bg-(--color-bg-surface) py-4 text-center text-sm font-bold text-(--color-text-secondary) shadow transition-colors duration-200 ease-in-out hover:bg-neutral-100/15"
          >
            Back to Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div
          className="flex min-h-screen items-center justify-center"
          role="status"
          aria-live="polite"
        >
          <p className="text-sm text-neutral-500">Loading...</p>
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
