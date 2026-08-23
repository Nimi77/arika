"use client";

import Link from "next/link";
import SocialAuthButtons from "../components/SocialAuthButtons";
import PasswordInput from "../components/PasswordInput";
import { useState } from "react";
import AuthInput from "../components/AuthInput";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogin(e: React.SubmitEvent) {
    e.preventDefault();
    setErrors({ errors: "Incorrect Password" });

    console.log("login successful");
  }

  return (
    <div className="login-authentication-page">
      <SocialAuthButtons />

      <div className="flex items-center gap-3 my-6">
        <hr className="flex-1 border-neutral-200 dark:border-neutral-700" />
        <span className="text-xs text-(--colortext-subtle) whitespace-nowrap">
          or continue with email
        </span>
        <hr className="flex-1 border-neutral-200 dark:border-neutral-700" />
      </div>
      <form
        onSubmit={handleLogin}
        aria-label="Log in form"
        className="flex flex-col gap-4"
      >
        <AuthInput
          id="email"
          label="Email address"
          type="email"
          autoComplete="email"
          placeholder="sarah@example.com"
          value={email}
          onChange={setEmail}
          error={errors.email}
          required
        />
        <PasswordInput
          id="password"
          label="Password"
          value={password}
          onChange={setPassword}
          error={errors.password}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full bg-(--color-action-primary) text-white py-3 text-sm font-semibold transition-all duration-250 ease-out hover:bg-(--color-action-primary-hover) hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(99,91,255,0.3)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Please wait..." : "Log In"}
        </button>
      </form>
      <div className="flex justify-center gap-2 text-sm mt-3">
        <p className="text-(--color-text-subtle)">
          New to Arika?{" "}
          <Link
            href="/auth/register"
            className="text-(--color-action-primary) font-medium hover:underline transition-colors"
          >
            Get Started
          </Link>
        </p>
      </div>
    </div>
  );
}
