"use client";

import Link from "next/link";
import SocialAuthButtons from "../components/SocialAuthButtons";

export default function LoginPage() {
  return (
    <div className="login-authentication-page">
      <SocialAuthButtons />
      <div className="flex items-center gap-3 my-6">
        <hr className="flex-1 border-(--color-surface) dark:border-neutral-700" />
        <span className="text-xs text-(--color-subtle) whitespace-nowrap">
          or continue with email
        </span>
        <hr className="flex-1 border-(--color-surface) dark:border-neutral-700" />
      </div>
      <form className="space-y-5" aria-label="Login form">
        <div className="email">
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-white"
          >
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="w-full rounded-2xl bg-(--color-surface) px-4 py-3"
            placeholder="sarah@example.com"
          />
        </div>
        <div className="password">
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-white"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="w-full rounded-2xl bg-(--color-surface) px-4 py-3"
            placeholder="Enter your preferred password"
          />
        </div>
        <div className="flex justify-end">
          <Link
            href="/auth/reset-password"
            className="text-sm text-(--color-accent) transition-colors underline"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-(--color-accent) px-4 py-3 text-sm font-bold text-white transition hover:bg-(--color-accent-hover) disabled:cursor-not-allowed disabled:opacity-60"
        >
          Log In
        </button>
      </form>
      <div className="flex justify-center gap-2 text-sm mt-3">
        <p className="text-(--color-subtle)">
          New to Arika?{" "}
          <Link
            href="/auth/register"
            className="text-(--color-accent) hover:underline transition-colors"
          >
            Get Started
          </Link>
        </p>
      </div>
    </div>
  );
}
