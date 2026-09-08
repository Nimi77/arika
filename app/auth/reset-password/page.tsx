"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PasswordInput from "../components/PasswordInput";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { CircleCheck, CircleX } from "lucide-react";

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
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [step, setStep] = useState<ResetPasswordStep>(token ? "form" : "expired");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  type PasswordField = "password" | "confirmPassword";

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});

    if (!token) {
      setErrors({ form: "This reset link is invalid or has expired." });
      return;
    }

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await apiFetch(
        `/auth/reset-password?token=${encodeURIComponent(token)}`,
        {
          method: "POST",
          body: JSON.stringify({ password }),
        },
      );
      setStep("success");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "We couldn't reset your password. Please try again.";
      const lowerMessage = message.toLowerCase();

      if (
        lowerMessage.includes("expired") ||
        lowerMessage.includes("reset token") ||
        lowerMessage.includes("invalid token")
      ) {
        setStep("expired");
        return;
      }

      setErrors({
        form: message,
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
      <div className="reset-password-page w-full">
        <div
          className="flex flex-col items-center gap-4 text-center"
          aria-live="polite"
        >
          {/* Checked logo */}
          <div
            aria-hidden="true"
            className="flex items-center justify-center rounded-full"
          >
            <CircleCheck size={70} className="text-(--color-action-primary)" />
          </div>

          <div className="password-reset">
            <h2 className="text-lg font-extrabold text-(--color-text-primary)">
              Password updated
            </h2>
            <p className="mt-2 text-sm leading-5 text-(--color-text-subtle)">
              Your password has been changed successfully. You can now sign in
              to your Arika account with your new credentials.
            </p>
          </div>

          <div className="mt-2 w-full">
            <button
              type="button"
              onClick={() => router.push("/auth/login")}
              className="w-full rounded-full bg-(--color-action-primary) text-white py-3 text-sm font-semibold transition-colors hover:bg-(--color-action-primary-hover)"
            >
              Sign in to account
            </button>
          </div>
        </div>
      </div>
    );
  }

  /*
   * EXPIRED STATE
   */
  if (step === "expired") {
    return (
      <div
        className="password-expired flex flex-col items-center gap-4 text-center"
        aria-live="polite"
      >
        {/* Cancel logo */}
        <div
          aria-hidden="true"
          className="flex  items-center justify-center rounded-full"
        >
          <CircleX size={66} className="text-(--color-warning)" />
        </div>

        <div>
          <h2 className="text-lg font-extrabold text-(--color-text-primary)">
            Reset link expired
          </h2>
          <p className="mt-2 text-sm leading-5 text-(--color-text-subtle)">
            For your security, password reset links expire after 30 minutes.
            Please request a new link to proceed.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3">
          <button
            type="button"
            onClick={() => router.push("/auth/forgot-password")}
            className="w-full rounded-full bg-(--color-warning) text-white py-3 text-sm font-bold transition-colors duration-300 ease-out hover:-translate-y-0.5 hover:bg-amber-900/85 dark:hover:bg-amber-500/70"
          >
            Request a New Reset Link
          </button>

          <Link
            href="/auth/login"
            className="w-full rounded-full bg-(--color-bg-surface) text-(--color-text-secondary) py-3 text-sm font-bold shadow transition-colors ease-in-out duration-200 hover:bg-neutral-100/15"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    );
  }

  /*
   * RESET PASSWORD FORM
   */
  return (
    <div className="reset-password-page w-full">
      <div className="heading-text mb-6 text-center">
        <h1 className="text-2xl font-extrabold tracking-[-0.32px] text-(--color-text-primary)">
          Create new password
        </h1>

        <p className="text-sm text-(--color-text-subtle)">
          Your new password must meet our security standards.
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
        aria-label="Reset password form"
      >
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
          {REQUIREMENTS.map((requirement) => (
            <li
              key={requirement.label}
              className={
                requirement.test(password)
                  ? "text-(--color-action-primary)"
                  : ""
              }
            >
              • {requirement.label}
            </li>
          ))}
        </ul>

        {errors.form && (
          <p
            role="alert"
            className="text-sm text-red-600 dark:text-(--color-text-error)"
          >
            {errors.form}
          </p>
        )}

        <div className="flex flex-col justify-center items-center gap-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-(--color-action-primary) text-white py-3 text-sm font-semibold transition-colors hover:bg-(--color-action-primary-hover) disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Resetting password..." : "Reset password"}
          </button>

          <p className="text-center text-sm text-(--color-text-subtle)">
            We'll email you a secure recovery link. Back to{" "}
            <Link
              href="/auth/login"
              className="text-(--color-action-primary) font-semibold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-sm text-neutral-500">Loading...</p>
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
