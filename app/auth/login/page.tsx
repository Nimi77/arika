"use client";

import Link from "next/link";
import SocialAuthButtons from "../components/SocialAuthButtons";
import PasswordInput from "../components/PasswordInput";
import { useState } from "react";
import AuthInput from "../components/AuthInput";
import { useRouter } from "next/navigation";
import { apiFetch, storeAuthToken } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: "email" | "password", value: string) => {
    if (field === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }

    if (errors.email || errors.password) {
      setErrors({});
    }
  };

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
      const data = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      storeAuthToken(data.data);
      router.push("/business/setup");
    } catch (err: any) {
      const backendMessage =
        typeof err?.body?.message?.message === "string"
          ? err.body.message.message
          : "";

      if (backendMessage.toLowerCase().includes("verify")) {
        setErrors({
          password: "Please verify your email before logging in",
        });
      } else if (err?.status === 401) {
        setErrors({ password: "Incorrect email or password" });
      } else {
        setErrors({ password: "Something went wrong. Please try again." });
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="login-authentication-page">
      <SocialAuthButtons />

      <div className="flex items-center gap-3 my-6">
        <hr className="flex-1 border-neutral-200 dark:border-neutral-700" />
        <span className="text-xs text-(--color-text-subtle) whitespace-nowrap">
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
          onChange={(value) => handleChange("email", value)}
          error={errors.email}
          required
        />
        <PasswordInput
          id="password"
          label="Password"
          value={password}
          onChange={(value) => handleChange("password", value)}
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
            className="text-(--color-text-action) font-medium hover:underline transition-colors"
          >
            Get Started
          </Link>
        </p>
      </div>
    </div>
  );
}
