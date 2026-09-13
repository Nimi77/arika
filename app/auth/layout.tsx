"use client";

import type { ReactNode } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/public/logo.svg";

type AuthLayoutProps = {
  children: ReactNode;
  hideLogo?: boolean;
};

export default function AuthLayout({
  children,
  hideLogo = false,
}: AuthLayoutProps) {
  const pathname = usePathname();

  const isRegisterPage = pathname.startsWith("/auth/register");
  const isVerifyEmailPage = pathname.startsWith("/auth/verify-email");
  const isResetPasswordPage = pathname.startsWith("/auth/reset-password");
  const isForgotPasswordPage = pathname.startsWith("/auth/forgot-password");

  const shouldShowLogo =
    !hideLogo &&
    !isVerifyEmailPage &&
    !isResetPasswordPage &&
    !isForgotPasswordPage;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-10 sm:px-6 sm:py-14">
      {shouldShowLogo && (
        <div className="mb-6 flex flex-col items-center gap-2">
          <Link href="/" aria-label="Arika home" className="mb-4">
            <Image
              src={logo}
              alt=""
              width={70}
              height={70}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {!isResetPasswordPage && (
            <div className="heading-text text-center">
              <h1 className="text-2xl font-extrabold tracking-[-0.32px] text-(--color-text-primary)">
                {isRegisterPage
                  ? "Create your Arika account"
                  : "Welcome back to Arika"}
              </h1>

              <p className="max-w-100 text-sm text-(--color-text-subtle)">
                {isRegisterPage
                  ? "Manage customer conversations across all channels."
                  : "Sign in to manage your customer conversations."}
              </p>
            </div>
          )}
        </div>
      )}

      <div className="auth-body w-full max-w-lg">{children}</div>
    </div>
  );
}
