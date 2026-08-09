"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "your email";
  const [isResending, setIsResending] = useState(false);
  const [resent, setResent] = useState(false);

  async function handleResend() {
    setIsResending(true);

    try {
      // await resend verification request.
      await Promise.resolve();
      setResent(true);
    } catch (err) {
      // handle resend failure here
    } finally {
      setIsResending(false);
    }
  }

  return (
    <div className="section-shell flex min-h-screen flex-col items-center justify-center px-4 py-10 sm:py-16">
      <Image src={logo} alt="Arika" width={70} height={70} priority />

      <h1 className="mt-6 text-center text-2xl font-bold text-(--color-text) sm:text-3xl">
        Verify your email
      </h1>

      <p className="mt-2 max-w-xs text-center text-sm text-neutral-500 sm:max-w-sm">
        We sent a verification link to{" "}
        <span className="font-medium text-(--color-text)">{email}</span>. Click
        the link in your email to activate your account.
      </p>

      <div className="mt-8 flex max-w-sm flex-col items-center gap-4 px-5 py-4">
        <button
          type="button"
          onClick={handleResend}
          disabled={isResending || resent}
          className={`w-full rounded-full py-2 font-bold transition-colors ${
            resent
              ? "bg-(--color-btn-secondary-bg) text-(--color-accent)"
              : "btn-primary"
          }`}
        >
          {isResending
            ? "Sending..."
            : resent
              ? "Verification link sent"
              : "Resend verification link"}
        </button>

        <p className="text-center text-sm text-neutral-500">
          Wrong email address?{" "}
          <Link
            href="/auth/register"
            className="footer-link font-medium text-(--color-accent)"
          >
            Change email
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={null}>
      <VerifyEmailContent />
    </Suspense>
  );
}
