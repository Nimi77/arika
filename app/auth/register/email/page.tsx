"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PasswordInput from "../../components/PasswordInput";
import SocialAuthButtons from "../../components/SocialAuthButtons";
import FormBanner from "../../components/FormBanner";
import AuthInput from "../../components/AuthInput";

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
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [emailExists, setEmailExists] = useState(false);
  const [emailAuthFailed, setEmailAuthFailed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Checks if the form is completely filled and valid
  const isFormValid =
    fullName.trim().length > 0 &&
    businessName.trim().length > 0 &&
    /\S+@\S+\.\S+/.test(email) &&
    REQUIREMENTS.every((r) => r.test(password)) &&
    confirmPassword === password &&
    confirmPassword.length > 0;

  function validate() {
    const next: Record<string, string> = {};
    if (!businessName.trim()) next.businessName = "Business name is required";
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
    setEmailExists(false);
    setEmailAuthFailed(false);
    setErrors((prev) => ({ ...prev, email: "" }));
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      console.log("Signup data:", { businessName, email, password });
      // await registerUser({ businessName, email, password })

      // ===== TEMPORARY TEST TRIGGERS — remove once backend is connected =====
      if (email === "test@exists.com") {
        throw { reason: "duplicate_email" };
      }
      if (email === "test@fail.com") {
        throw { reason: "auth_failed" };
      }
      // =========================================================================

      // On success, route to the verification page
      router.push(`/auth/verify-email?email=${encodeURIComponent(email)}`);
    } catch (err: any) {
      if (err?.reason === "duplicate_email") {
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
      <SocialAuthButtons />

      <div className="flex items-center gap-3 my-6">
        <hr className="flex-1 border-(--color-surface) dark:border-neutral-700" />
        <span className="text-xs text-(--color-subtle) whitespace-nowrap">
          or continue with email
        </span>
        <hr className="flex-1 border-(--color-surface) dark:border-neutral-700" />
      </div>

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
        <div>
          <AuthInput
            id="businessName"
            label="Business name"
            placeholder="Sarah's Fashion Hub"
            value={businessName}
            onChange={setBusinessName}
            error={errors.businessName}
            required
          />
          <p className="mt-1 text-xs text-neutral-500">
            This will be displayed on your main workspace
          </p>
        </div>
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
              className={r.test(password) ? "text-(--color-accent)" : ""}
            >
              • {r.label}
            </li>
          ))}
        </ul>

        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className={`text-sm font-bold rounded-full py-3 mt-2 transition-colors duration-200 ${
            isFormValid && !isSubmitting
              ? "bg-(--color-accent) hover:bg-(--color-accent-hover) text-white cursor-pointer"
              : "bg-(--color-surface) text-(--color-subtle) cursor-not-allowed opacity-60"
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
            className="text-(--color-accent) hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
