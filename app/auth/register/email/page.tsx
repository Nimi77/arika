"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PasswordInput from "../../components/PasswordInput";
import FormBanner from "../../components/FormBanner";
import AuthInput from "../../components/AuthInput";
import { apiFetch, storeAuthTokens } from "@/lib/api";

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

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [emailExists, setEmailExists] = useState(false);
  const [emailAuthFailed, setEmailAuthFailed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid =
    fullName.trim().length > 0 &&
    /\S+@\S+\.\S+/.test(email) &&
    REQUIREMENTS.every((r) => r.test(password)) &&
    confirmPassword === password &&
    confirmPassword.length > 0;

  function validate() {
    const next: Record<string, string> = {};
    if (!email.trim()) next.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) next.email = "Enter a valid email";
    if (!REQUIREMENTS.every((r) => r.test(password)))
      next.password = "Password doesn't meet the requirements";
    if (confirmPassword !== password)
      next.confirmPassword = "Passwords don't match";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("handleSubmit fired", { isFormValid, fullName, email }); // temporary debug line
    setEmailExists(false);
    setEmailAuthFailed(false);
    setErrors((prev) => ({ ...prev, email: "" }));
    if (!validate()) {
      console.log("validate() failed, stopping here"); // temporary debug line
      return;
    }

    setIsSubmitting(true);
    try {
      const data = await apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify({ fullName, email, password }),
      });

      console.log("Register response:", data); // temporary debug line

      storeAuthTokens(data.data);

      router.push(`/auth/verify-email?email=${encodeURIComponent(email)}`);
    } catch (err: any) {
      console.log("Register error:", err); // temporary debug line
      if (err?.status === 409) {
        setEmailExists(true);
        setErrors((prev) => ({
          ...prev,
          email: "This email is already registered",
        }));
      } else {
        setEmailAuthFailed(true);
        setErrors((prev) => ({
          ...prev,
          email: "We couldn't verify this email. Please try again.",
        }));
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="email-registration-page">
      {emailExists && (
        <div className="mb-4">
          <FormBanner
            message="An account with this email already exists."
            actionLabel="Sign in instead"
            onAction={() => router.push("/auth/login")}
          />
        </div>
      )}
      {emailAuthFailed && (
        <div className="mb-4">
          <FormBanner message="We couldn't verify this email. Please try again." />
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <AuthInput
          id="fullName"
          label="Full Name"
          placeholder="e.g. Sarah Johnson"
          value={fullName}
          onChange={setFullName}
          error={errors.fullName}
          required
        />
        <AuthInput
          id="email"
          label="Email address"
          type="email"
          placeholder="sarah@example.com"
          value={email}
          onChange={(v) => {
            setEmail(v);
            if (emailAuthFailed) setEmailAuthFailed(false);
            if (emailExists) {
              setEmailExists(false);
              setErrors((prev) => ({ ...prev, email: "" }));
            }
          }}
          error={errors.email}
          showErrorMessage={false}
          autoComplete="email"
          required
        />
        <PasswordInput
          id="password"
          label="Password"
          value={password}
          onChange={setPassword}
          error={errors.password}
        />
        <PasswordInput
          id="confirmPassword"
          label="Confirm password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          error={errors.confirmPassword}
        />

        <ul
          aria-label="Password requirements"
          className="text-xs text-neutral-500 flex flex-col gap-1 -mt-2"
        >
          {REQUIREMENTS.map((r) => (
            <li
              key={r.label}
              className={
                r.test(password) ? "text-(--color-action-primary)" : ""
              }
            >
              • {r.label}
            </li>
          ))}
        </ul>

        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className={`text-sm font-bold rounded-full py-3 mt-2 transition-all duration-250 disabled:cursor-not-allowed disabled:opacity-60 ${
            isFormValid && !isSubmitting
              ? "bg-(--color-action-primary) hover:bg-(--color-action-primary-hover) text-white cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(99,91,255,0.3)] active:translate-y-0"
              : "bg-(--color-bg-surface) text-(--color-text-subtle) cursor-not-allowed"
          }`}
        >
          {isSubmitting ? "Creating account..." : "Create Account"}
        </button>
      </form>

      <div className="mt-6">
        <p className="text-sm text-center text-neutral-500">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-(--color-action-primary) font-medium hover:underline transition-colors"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
