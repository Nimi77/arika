"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PasswordInput from "../components/PasswordInput";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

const REQUIREMENTS = [
  { label: "Minimum 8 characters", test: (v: string) => v.length >= 8 },
  {
    label: "At least 1 uppercase & 1 lowercase character",
    test: (v: string) => /[a-z]/.test(v) && /[A-Z]/.test(v),
  },
  { label: "At least 1 number", test: (v: string) => /\d/.test(v) },
  {
    label: "At least 1 special character (!@#$%^*)",
    test: (v: string) => /[!@#$%^*]/.test(v),
  },
];

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate() {
    const next: Record<string, string> = {};
    if (!REQUIREMENTS.every((r) => r.test(password))) {
      next.password = "Password doesn't meet the requirements";
    }
    if (confirmPassword !== password) {
      next.confirmPassword = "Passwords don't match";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    if (!token) {
      setErrors({ form: "This reset link is invalid or has expired." });
      return;
    }

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await apiFetch("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ token, password }),
      });
      router.push("/auth/login");
    } catch (error) {
      setErrors({
        form: "We couldn't reset your password. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="reset-password-page w-full mt-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
        aria-label="Reset password form"
      >
        <PasswordInput
          id="password"
          label="New password"
          value={password}
          onChange={setPassword}
          error={errors.password}
        />

        <PasswordInput
          id="confirmPassword"
          label="Confirm new password"
          value={confirmPassword}
          onChange={setConfirmPassword}
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
          <p role="alert" className="text-center text-xs text-red-600">
            {errors.form}
          </p>
        )}
        <div className="flex flex-col gap-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-(--color-action-primary) py-3 text-sm font-semibold transition-colors hover:bg-(--color-action-primary-hover) disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Resetting password..." : "Reset password"}
          </button>
          <Link
            href="/auth/login"
            className="bg-(--color-bg-surface) text-(--color-text-secondary) w-full rounded-full py-3 text-sm hover:bg-neutral-700/15 transition-colors duration-200 text-center block"
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
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-sm text-neutral-500">Loading...</p>
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
