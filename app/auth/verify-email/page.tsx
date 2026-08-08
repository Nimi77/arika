// app/auth/verify-email/page.tsx
"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "your email";
  const [isResending, setIsResending] = useState(false);
  const [resent, setResent] = useState(false);

  // Placeholder — backend dev will replace this with the real resend call
  async function handleResend() {
    setIsResending(true);
    try {
      // await resendVerificationEmail(email)
      setResent(true);
    } catch (err) {
      // handle resend failure here
    } finally {
      setIsResending(false);
    }
  }

  return (
    <div className="section-shell flex flex-col justify-center h-screen items-center px-4 py-10 sm:py-16">
      <Image src={logo} alt="Arika" width={70} height={70} priority />

      <h1 className="mt-6 text-2xl text-[var(--color-text)] sm:text-3xl font-bold text-center">
        Verify your email
      </h1>

      <p className="mt-2 text-sm text-neutral-500 text-center max-w-xs sm:max-w-sm">
        We sent a verification link to{" "}
        <span className="text-[var(--color-text)] font-medium">{email}</span>.
        Click the link in your email to activate your account.
      </p>

      <div className="py-4 px-5 max-w-sm mt-8 flex flex-col items-center gap-4">
        <button
          type="button"
          onClick={handleResend}
          disabled={isResending || resent}
          className={`w-full py-2 rounded-full font-bold transition-colors ${
            resent
              ? "bg-[var(--color-btn-secondary-bg)] text-[var(--color-accent)]"
              : "btn-primary"
          }`}
        >
          <Link href="/auth/profile-setup">Resend verification link</Link>
        </button>

        <p className="text-sm text-center text-neutral-500">
          Wrong email address?{" "}
          <Link
            href="/auth/register"
            className="footer-link font-medium text-[var(--color-accent)]"
          >
            Change email
          </Link>
        </p>
      </div>
    </div>
  );
}
