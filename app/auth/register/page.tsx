// app/auth/register/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";
import AuthInput from "../components/AuthInput";
import PasswordInput from "../components/PasswordInput";
import SocialAuthButtons from "../components/SocialAuthButtons";
import FormBanner from "../components/FormBanner";

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
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [emailExists, setEmailExists] = useState(false);
  const [emailAuthFailed, setEmailAuthFailed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [failedProvider, setFailedProvider] = useState<
    "google" | "apple" | null
  >(null);

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
  // Placeholders — backend devs will replace the body of these
  // with real signInWith("google") / signInWith("apple") calls
  async function handleGoogleClick() {
    try {
      setAuthError(null);
      setFailedProvider(null);
      // await signInWith("google")

      // ===== TEMPORARY TEST TRIGGER — remove once backend is connected =====
      throw new Error("test");
      // =========================================================================
    } catch (err) {
      setFailedProvider("google");
      setAuthError(
        "Authentication with Google failed. Please try again or sign up with email",
      );
    }
  }
  async function handleAppleClick() {
    try {
      setAuthError(null);
      setFailedProvider(null);
      // await signInWith("apple")

      // ===== TEMPORARY TEST TRIGGER — remove once backend is connected =====
      throw new Error("test");
      // =========================================================================
    } catch (err) {
      setFailedProvider("apple");
      setAuthError(
        "Authentication with Apple failed. Please try again or sign up with email",
      );
    }
  }

  return (
    <div className="section-shell flex flex-col items-center  px-4 py-10 sm:py-16">
      <Image src={logo} alt="Arika" width={70} height={70} priority />
      <h1 className="mt-6 text-2xl text-(--color-text) sm:text-3xl font-bold text-center">
        Create your Arika Account
      </h1>
      <p className="mt-2 text-sm text-neutral-500 text-center">
        Manage customer conversations across all channels.
      </p>

      <div className="w-full max-w-sm mt-8">
        <SocialAuthButtons
          authError={authError}
          failedProvider={failedProvider}
          onGoogleClick={handleGoogleClick}
          onAppleClick={handleAppleClick}
        />

        <div className="flex items-center gap-3 my-6">
          <hr className="flex-1 border-neutral-300 dark:border-neutral-700" />
          <span className="text-xs text-neutral-500 whitespace-nowrap">
            Continue with email
          </span>
          <hr className="flex-1 border-neutral-300 dark:border-neutral-700" />
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
          <div>
            <AuthInput
              id="businessName"
              label="Business name"
              placeholder="Sarah's fashion Hub"
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
            disabled={isSubmitting}
            className="btn-primary py-2 mt-2"
          >
            {isSubmitting ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-neutral-500">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="footer-link font-medium text-(--color-accent)"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
