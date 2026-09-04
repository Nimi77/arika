"use client";

import Link from "next/link";
import { MailIcon } from "lucide-react";
import { useState } from "react";
import SocialAuthButtons from "../components/SocialAuthButtons";

export default function RegisterPage() {
  const [agreed, setAgreed] = useState(true);

  return (
    <div className="register-authentication-page flex w-full flex-col items-center">
      <div className="auth-buttons-container w-full">
        <SocialAuthButtons />
        <Link
          href={agreed ? "/auth/register/email" : ""}
          aria-disabled={!agreed}
          tabIndex={agreed ? 0 : -1}
          onClick={(e) => {
            if (!agreed) {
              e.preventDefault();
            }
          }}
          className={`mt-3 py-3 text-sm font-medium flex w-full items-center justify-center gap-2 rounded-full border border-transparent bg-(--color-bg-surface) transition-all 
            ${
              agreed
                ? "hover:border-(--color-action-primary)"
                : "cursor-not-allowed opacity-50"
            }
          `}
        >
          <MailIcon width={18} height={18} />
          Sign up with Email
        </Link>
      </div>

      {/* login route */}
      <div className="login-link mt-4 mb-8">
        <p className="text-sm text-center text-(--color-text-subtle)">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-(--color-text-action) font-semibold hover:underline transition-colors"
          >
            Login
          </Link>
        </p>
      </div>

      {/* terms & policy */}
      <div className="terms-of-service">
        <label className="flex cursor-pointer justify-center items-start gap-2">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="peer sr-only"
          />

          <span
            className="flex h-5 w-5 shrink-0 items-center justify-center
            rounded-full border border-neutral-400
            bg-white transition-colors
            peer-checked:border-(--color-action-primary)
            peer-checked:bg-(--color-action-primary)
            peer-focus-visible:ring-2
            peer-focus-visible:ring-(--color-action-primary)
            peer-focus-visible:ring-offset-2
          "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-opacity ${
                agreed ? "opacity-100" : "opacity-0"
              }`}
              aria-hidden="true"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </span>

          <p className="text-sm font-normal leading-5 text-(--color-text-subtle)">
            By continuing, you agree to Arika's{" "}
            <a
              href="/terms"
              className="text-(--color-text-action) hover:underline"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              className="text-(--color-text-action) hover:underline"
            >
              Privacy Policy
            </a>
          </p>
        </label>
      </div>
    </div>
  );
}
